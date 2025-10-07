export function removeEmptyProps<T extends Record<string, any>>(
  params: T,
): Partial<T> {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}
