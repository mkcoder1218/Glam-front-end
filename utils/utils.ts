export interface QueryParams {
    filters?: Record<string, any>;           // exact match filters
    search?: Record<string, string>;         // full-text search fields
    limit?: number;
    offset?: number;
    order?: [string, "ASC" | "DESC"][];     // ordering
    include?: any[];                         // associations (strings/objects)
  }
  
  // Encode query to Base64 string (frontend-safe)
   export const encodeQuery = (params: QueryParams) => {
    return btoa(JSON.stringify(params));
  };
  
  // Decode Base64 string back to JSON (frontend-safe)
  export const decodeQuery = (encoded: string): QueryParams => {
    try {
      return JSON.parse(atob(encoded));
    } catch {
      return {};
    }
  };
  
  // Example usage on frontend
