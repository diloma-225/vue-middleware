// Definition of the context interface with properties needed for middleware
interface Context {
    req: any;
    res: any;
    next: (() => void) | (() => ReturnType<typeof middlewarePipeline>); // 'next' can be either a function or the result of a function
    // ... other properties as per middleware requirements
}

// Type definition for middleware function
type Middleware = (context: Context) => void;

// Function to handle middleware execution in a sequential pipeline
function middlewarePipeline(context: any, middleware: Middleware[], index: number) {
    // Retrieve the middleware at the current index
    const nextMiddleware = middleware[index];
    
    // If no more middleware, return the 'next' function from the context
    if (!nextMiddleware) {
        return context.next;
    }

    // Return a function representing the next step in the middleware pipeline
    return () => {
        // Recursively call the middlewarePipeline for the next middleware
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        );

        // Execute the current middleware with an updated context and 'next' function
        nextMiddleware({ ...context, next: nextPipeline });
    };
}

// Export the middlewarePipeline function for use in other parts of the code
export default middlewarePipeline;
