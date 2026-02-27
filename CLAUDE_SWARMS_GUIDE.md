# Claude Code Agent Teams & Swarms Guide

> A comprehensive guide for orchestrating multi-agent AI workflows with Claude Code v2.1.33+ and Opus 4.6

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [When to Use Agent Teams](#when-to-use-agent-teams)
4. [Spawning & Coordination](#spawning--coordination)
5. [TeammateTool Operations](#teammmatetool-operations)
6. [Task System](#task-system)
7. [Orchestration Patterns](#orchestration-patterns)
8. [Real-World Examples](#real-world-examples)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

```bash
# 1. Install/upgrade Claude Code
npm install -g @anthropic-ai/claude-code@latest

# 2. Verify version (need 2.1.32+)
claude --version

# 3. Enable agent teams
echo 'export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1' >> ~/.bashrc
source ~/.bashrc
```

### Configuration

Add to `~/.config/claude-code/settings.json`:

```json
{
  "model": "claude-opus-4-6",
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "teammateMode": "auto"
}
```

### Your First Team

```
Create an agent team to review this codebase. Spawn three reviewers:
- One focused on security vulnerabilities
- One checking performance bottlenecks
- One validating test coverage
Have them report findings to me.
```

---

## Architecture Overview

### Core Components

| Component | Role |
|-----------|------|
| **Team Lead** | Your main session. Creates team, spawns teammates, coordinates work, synthesizes results |
| **Teammates** | Separate Claude instances. Each has own context window, works independently |
| **Task List** | Shared work items with states: pending → in_progress → completed |
| **Mailbox** | Message system for inter-agent communication |

### File System Structure

```
~/.claude/
├── teams/
│   └── {team-name}/
│       ├── config.json     # Team metadata, member list
│       └── inboxes/        # Inter-agent message files
│           ├── team-lead.json
│           └── {teammate}.json
└── tasks/
    └── {team-name}/        # Team task list
```

### Subagents vs Agent Teams

| Feature | Subagents | Agent Teams |
|---------|-----------|-------------|
| **Context** | Own window; results return to caller | Own window; fully independent |
| **Communication** | Report back to main agent only | Message each other directly |
| **Coordination** | Main agent manages all | Shared task list, self-coordinate |
| **Best for** | Focused tasks where only result matters | Complex work requiring collaboration |
| **Token cost** | Lower (summarized back) | Higher (separate instances) |

**Key insight**: Teammates can *challenge each other's findings*—this is true agentic orchestration.

---

## When to Use Agent Teams

### Strong Use Cases

1. **Research & Review**
   - Multiple teammates investigate different aspects simultaneously
   - Share and challenge each other's findings

2. **New Modules/Features**
   - Each teammate owns a separate piece without conflicts

3. **Debugging with Competing Hypotheses**
   - Test different theories in parallel
   - Converge on answer faster via debate

4. **Cross-Layer Coordination**
   - Frontend, backend, tests each owned by different teammate

### When NOT to Use Teams

- Sequential tasks with many dependencies
- Same-file edits (causes overwrites)
- Simple tasks (coordination overhead exceeds benefit)
- When context sharing is critical (each teammate starts fresh)

---

## Spawning & Coordination

### Display Modes

**In-process** (default): All teammates in main terminal
- Navigate: `Shift+Up/Down` to select teammate
- View session: `Enter`
- Interrupt: `Escape`
- Toggle task list: `Ctrl+T`

**Split panes**: Each teammate gets own pane (requires tmux/iTerm2)
```bash
# Force split panes
claude --teammate-mode tmux
```

### Spawn Commands

```
# Basic spawn
Create an agent team with 3 teammates to refactor these modules.

# Specify models
Spawn 4 teammates using Sonnet for each one.

# Require plan approval
Spawn an architect teammate to redesign auth.
Require plan approval before they make changes.
```

### Delegate Mode

Prevents lead from implementing tasks itself:
- Press `Shift+Tab` to cycle into delegate mode
- Lead restricted to coordination-only tools

---

## TeammateTool Operations

### Team Management

| Operation | Description |
|-----------|-------------|
| `spawnTeam` | Create named team |
| `discoverTeams` | List available teams |
| `requestJoin` / `approveJoin` | Join procedures |
| `cleanup` | Remove team resources |

### Communication

| Operation | Description |
|-----------|-------------|
| `write` | Message one specific teammate |
| `broadcast` | Message all teammates (expensive!) |

### Lifecycle

| Operation | Description |
|-----------|-------------|
| `requestShutdown` | Ask teammate to exit |
| `approveShutdown` | Accept shutdown (teammate-side) |

### Approval Workflows

| Operation | Description |
|-----------|-------------|
| `approvePlan` / `rejectPlan` | For plan-mode teammates |
| `approveJoin` / `rejectJoin` | Accept/decline join requests |

---

## Task System

### Task States

```
pending → in_progress → completed
```

### Creating Tasks

Tasks are created automatically by the lead, or you can be explicit:

```
Create these tasks for the team:
1. Research OAuth 2.0 best practices
2. Design authentication flow (blocked by #1)
3. Implement auth module (blocked by #2)
4. Write integration tests (blocked by #3)
```

### Task Dependencies

Tasks with unresolved dependencies cannot be claimed. When dependency completes, blocked tasks auto-unblock.

### Task Assignment

**Lead assigns**: Tell lead which task to give to which teammate
**Self-claim**: After finishing, teammate picks up next unassigned, unblocked task

---

## Orchestration Patterns

### Pattern 1: Parallel Specialists

Multiple reviewers analyze simultaneously with different lenses:

```
Create an agent team to review PR #142:
- Security reviewer: token handling, input validation, auth flows
- Performance reviewer: N+1 queries, memory leaks
- Test reviewer: coverage gaps, edge cases
Synthesize findings when done.
```

### Pattern 2: Sequential Pipeline

Tasks unblock in sequence via dependencies:

```
Create pipeline tasks:
1. Research caching patterns
2. Design cache architecture (depends on #1)
3. Implement caching (depends on #2)
4. Write tests (depends on #3)
5. Document the feature (depends on #3)

Spawn researcher and implementer teammates.
```

### Pattern 3: Competing Hypotheses (Debugging)

```
Users report the app exits after one message instead of staying connected.

Spawn 5 teammates to investigate different hypotheses:
- Connection lifecycle bug
- Event loop issue
- Race condition in message handler
- Memory leak causing crash
- Configuration problem

Have them debate and disprove each other's theories.
Update findings doc with consensus.
```

### Pattern 4: Research → Implementation

```
1. First, spawn a researcher to investigate best practices for [topic]
2. Wait for their findings
3. Then spawn implementers to build based on research
```

### Pattern 5: Self-Organizing Swarm

Workers claim available tasks from pool:

```
Create 10 independent review tasks for all modules in src/.
Spawn 4 worker teammates.
Let them race to claim tasks and auto-load-balance.
```

---

## Real-World Examples

### Example 1: Full Feature Implementation

```
I'm adding user authentication to this Next.js app.

Create an agent team:
- Backend architect: design auth service, database schema
- Frontend specialist: login/signup forms, session UI
- Security reviewer: validate approach, check vulnerabilities
- Test engineer: write E2E and unit tests

Coordinate dependencies:
1. Architecture design first (backend + security)
2. Then implementation (frontend + backend in parallel)
3. Finally testing (after implementation)

Use plan approval for architect before implementing.
```

### Example 2: Codebase Migration

```
We're migrating from Express to Fastify.

Create a team:
- Route migrator: convert all route handlers
- Middleware migrator: adapt middleware patterns
- Test updater: update test files for new framework
- Documentation writer: update API docs

Each owns separate file patterns - no conflicts.
```

### Example 3: Bug Hunt

```
Production error: "Cannot read property 'id' of undefined"
appearing randomly in checkout flow.

Spawn investigation team:
- Teammate 1: Trace data flow through checkout
- Teammate 2: Check async race conditions
- Teammate 3: Review recent PRs for regressions
- Teammate 4: Search for similar historical bugs

Have them share findings and challenge each other.
```

---

## Best Practices

### 1. Give Teammates Enough Context

Teammates don't inherit lead's conversation history. Include details in spawn prompt:

```
Spawn a security reviewer with this context:
"Review auth module at src/auth/. The app uses JWT tokens
in httpOnly cookies. Focus on token handling, session management,
input validation. Report issues with severity ratings."
```

### 2. Size Tasks Appropriately

| Size | Result |
|------|--------|
| Too small | Coordination overhead exceeds benefit |
| Too large | Workers go too long without check-ins |
| Just right | Self-contained units with clear deliverables |

**Tip**: Aim for 5-6 tasks per teammate to keep everyone productive.

### 3. Prevent File Conflicts

Break work so each teammate owns different file sets:

```
Frontend teammate: src/components/, src/pages/
Backend teammate: src/api/, src/services/
Test teammate: tests/
```

### 4. Monitor and Steer

- Check in on progress regularly
- Redirect approaches that aren't working
- Synthesize findings as they come in
- Don't let team run unattended too long

### 5. Use Delegate Mode for Complex Orchestration

When you want lead to focus purely on coordination:
- Press `Shift+Tab` after creating team
- Lead won't try to implement tasks itself

### 6. Clean Up Properly

```
# Always use lead to clean up
Ask teammates to shut down first.
Then: Clean up the team.
```

Never let teammates run cleanup—their team context may not resolve correctly.

### 7. Start Simple

If new to teams, begin with read-only tasks:
- Code reviews
- Codebase research
- Bug investigation

Then progress to parallel implementation.

---

## Troubleshooting

### Teammates Not Appearing

1. **In-process mode**: Press `Shift+Down` to cycle through
2. Check task complexity warranted a team
3. For split panes, verify tmux: `which tmux`

### Too Many Permission Prompts

Pre-approve common operations in settings before spawning.

### Teammates Stopping on Errors

Check output with `Shift+Up/Down`, then:
- Give additional instructions directly, OR
- Spawn replacement teammate

### Lead Shuts Down Early

```
Wait for your teammates to complete their tasks before proceeding.
```

### Orphaned tmux Sessions

```bash
tmux ls
tmux kill-session -t <session-name>
```

### Task Status Lagging

If task appears stuck but work is done:
- Check if completed manually
- Tell lead to nudge teammate

---

## Environment Variables Reference

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Enable agent teams |
| `CLAUDE_CODE_SPAWN_BACKEND` | `in-process`, `tmux`, or `iterm2` |

Teammates automatically receive:
```bash
CLAUDE_CODE_TEAM_NAME="project-name"
CLAUDE_CODE_AGENT_NAME="security-reviewer"
CLAUDE_CODE_AGENT_ID="security-reviewer@project-name"
CLAUDE_CODE_AGENT_COLOR="#4A90D9"
```

---

## Token Usage Considerations

Agent teams use **significantly more tokens** than single sessions:
- Each teammate has own context window
- Usage scales with active teammate count

**Worth it for**: Research, review, debugging, new features
**Overkill for**: Routine tasks, simple fixes

---

## Limitations (Current)

- No session resumption with in-process teammates
- Task status can lag
- Shutdown can be slow (finishes current request)
- One team per session
- No nested teams (teammates can't spawn teams)
- Lead is fixed (can't transfer leadership)
- Split panes require tmux/iTerm2 (not VS Code terminal)

---

## Quick Reference Card

```
# Start team
"Create an agent team to [task] with [N] teammates"

# Navigation (in-process)
Shift+Up/Down  - Select teammate
Enter          - View session
Escape         - Interrupt
Ctrl+T         - Toggle task list
Shift+Tab      - Toggle delegate mode

# Common commands to lead
"Wait for teammates to complete"
"Ask [teammate] to shut down"
"Clean up the team"

# Check teammates
"What is each teammate working on?"
"Show me the task list"
```

---

## Sources

- [Official Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)
- [Building a C Compiler with Agent Teams](https://www.anthropic.com/engineering/building-c-compiler)
- [Claude Opus 4.6 Announcement](https://www.anthropic.com/news/claude-opus-4-6)
- [Claude Code GitHub Releases](https://github.com/anthropics/claude-code/releases)

---

*Guide created for Sprinter AI team - February 2026*
