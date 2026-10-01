import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label">404</p>
      <h1 className="mt-6 text-5xl font-medium tracking-[-0.04em] text-ink sm:text-7xl">This page does not exist.</h1>
      <p className="mt-6 max-w-md text-lg text-muted">The link may be outdated. The selected work is a good place to continue.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/#work">View selected work</Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </section>
  );
}
