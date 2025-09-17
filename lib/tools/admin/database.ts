import { tool } from 'ai';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const databaseTools = [] as any[]

/* Temporarily disabled - type issues with AI SDK
  [
  tool({
    name: 'queryDatabase',
    description: 'Execute a SELECT query on the Supabase database',
    parameters: z.object({
      table: z.string().describe('The table name to query'),
      select: z.string().describe('The columns to select (e.g., "*" or "id, name, email")'),
      filters: z.array(z.object({
        column: z.string(),
        operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'in']),
        value: z.any()
      })).optional().describe('Filter conditions'),
      orderBy: z.object({
        column: z.string(),
        ascending: z.boolean().default(true)
      }).optional(),
      limit: z.number().min(1).max(100).default(10)
    }),
    execute: async ({ table, select, filters, orderBy, limit }) => {
      try {
        let query = supabase.from(table).select(select);
        
        // Apply filters
        if (filters) {
          for (const filter of filters) {
            query = query[filter.operator](filter.column, filter.value);
          }
        }
        
        // Apply ordering
        if (orderBy) {
          query = query.order(orderBy.column, { ascending: orderBy.ascending });
        }
        
        // Apply limit
        query = query.limit(limit);
        
        const { data, error, count } = await query;
        
        if (error) throw error;
        
        return {
          success: true,
          data,
          count,
          message: `Found ${data?.length || 0} records`
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Query failed',
          message: 'Failed to execute database query'
        };
      }
    }
  }),

  tool({
    name: 'insertRecord',
    description: 'Insert a new record into the database',
    parameters: z.object({
      table: z.string().describe('The table name'),
      data: z.record(z.any()).describe('The data to insert as key-value pairs')
    }),
    execute: async ({ table, data }) => {
      try {
        const { data: result, error } = await supabase
          .from(table)
          .insert(data)
          .select()
          .single();
        
        if (error) throw error;
        
        return {
          success: true,
          data: result,
          message: 'Record inserted successfully'
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Insert failed',
          message: 'Failed to insert record'
        };
      }
    }
  }),

  tool({
    name: 'updateRecord',
    description: 'Update existing records in the database',
    parameters: z.object({
      table: z.string().describe('The table name'),
      data: z.record(z.any()).describe('The data to update'),
      filters: z.array(z.object({
        column: z.string(),
        operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte']),
        value: z.any()
      })).describe('Filter conditions to identify records to update')
    }),
    execute: async ({ table, data, filters }) => {
      try {
        let query = supabase.from(table).update(data);
        
        // Apply filters
        for (const filter of filters) {
          query = query[filter.operator](filter.column, filter.value);
        }
        
        const { data: result, error } = await query.select();
        
        if (error) throw error;
        
        return {
          success: true,
          data: result,
          count: result?.length || 0,
          message: `Updated ${result?.length || 0} records`
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Update failed',
          message: 'Failed to update records'
        };
      }
    }
  }),

  tool({
    name: 'deleteRecord',
    description: 'Delete records from the database',
    parameters: z.object({
      table: z.string().describe('The table name'),
      filters: z.array(z.object({
        column: z.string(),
        operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte']),
        value: z.any()
      })).describe('Filter conditions to identify records to delete')
    }),
    execute: async ({ table, filters }) => {
      try {
        let query = supabase.from(table).delete();
        
        // Apply filters
        for (const filter of filters) {
          query = query[filter.operator](filter.column, filter.value);
        }
        
        const { error, count } = await query;
        
        if (error) throw error;
        
        return {
          success: true,
          count,
          message: `Deleted ${count || 0} records`
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Delete failed',
          message: 'Failed to delete records'
        };
      }
    }
  }),

  tool({
    name: 'getTableSchema',
    description: 'Get the schema information for a table',
    parameters: z.object({
      table: z.string().describe('The table name')
    }),
    execute: async ({ table }) => {
      try {
        // Get a sample record to infer schema
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const columns = Object.keys(data[0]).map(key => ({
            name: key,
            type: typeof data[0][key],
            nullable: data[0][key] === null
          }));
          
          return {
            success: true,
            schema: {
              table,
              columns
            },
            message: `Found ${columns.length} columns`
          };
        }
        
        return {
          success: true,
          schema: { table, columns: [] },
          message: 'Table is empty, cannot infer schema'
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Schema fetch failed',
          message: 'Failed to get table schema'
        };
      }
    }
  }),

  tool({
    name: 'executeSql',
    description: 'Execute a raw SQL query (SELECT only for safety)',
    parameters: z.object({
      query: z.string().describe('The SQL query to execute (SELECT statements only)')
    }),
    execute: async ({ query }) => {
      try {
        // Safety check - only allow SELECT queries
        if (!query.trim().toUpperCase().startsWith('SELECT')) {
          throw new Error('Only SELECT queries are allowed for safety');
        }
        
        const { data, error } = await supabase.rpc('execute_sql', {
          query_text: query
        });
        
        if (error) throw error;
        
        return {
          success: true,
          data,
          message: `Query executed successfully`
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'SQL execution failed',
          message: 'Failed to execute SQL query'
        };
      }
    }
  })
];
*/