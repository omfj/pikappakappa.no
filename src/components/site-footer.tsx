export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center justify-center mt-10 w-full h-24 border-t">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">Pi Kappa Kappa</span>
      </p>
    </footer>
  );
}
