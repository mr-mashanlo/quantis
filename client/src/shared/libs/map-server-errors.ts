export const mapServerErrors = ( errors: Array<{ name: string, message: string }> ) => {
  return errors.reduce( ( acc: Record<string, Record<string, string>>, error: { name: string, message: string } ) => {
    acc[error.name] = { field: error.name, message: error.message };
    return acc;
  }, {} );
};