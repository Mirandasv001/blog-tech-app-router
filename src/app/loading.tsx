export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        <p className="text-lg font-medium">Cargando contenido...</p>
      </div>
    </div>
  );
}