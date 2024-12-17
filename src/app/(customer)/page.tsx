import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section aria-describedby="hero" className="py-16">
        <h2 id="hero" className="font-style text-center text-3xl lg:text-4xl">
          Hero section
        </h2>
      </section>

      {/* Featured Products Section */}
      <section aria-describedby="featured" className="py-16">
        <h2
          id="featured"
          className="font-style text-center text-3xl lg:text-4xl"
        >
          Featured section
        </h2>
      </section>

      {/* Call to Action Section */}
      <section aria-describedby="action" className="py-16">
        <h2
          id="action"
          className="font-style mb-4 text-center text-3xl lg:text-4xl"
        >
          Ready to start shopping?
        </h2>
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-8">
            Join thousands of satisfied customers and find your next favorite
            item today!
          </p>
          <Link
            href="/register"
            className={buttonVariants({ variant: "accent", size: "lg" })}
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </>
  );
}
