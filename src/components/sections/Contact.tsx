"use client";

import { useActionState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { type ActionState } from "@/lib/schemas";
import { sendContactEmail } from "@/app/actions/contact";

const initialState: ActionState = {};

export function Contact() {
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    initialState,
  );

  return (
    <SectionWrapper id="contact">
      <FadeIn>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-100">
          Get in Touch
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-neutral-400 mt-2">
          Have a project in mind? Let&apos;s talk.
        </p>
      </FadeIn>

      <div className="max-w-xl mx-auto mt-12">
        {state.success && state.message && (
          <div className="mb-6 p-4 rounded-xl bg-green-950 border border-green-800 text-green-400 text-sm">
            {state.message}
          </div>
        )}
        {state.success === false && state.message && !state.errors && (
          <div className="mb-6 p-4 rounded-xl bg-red-950 border border-red-800 text-red-400 text-sm">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          {/* Name */}
          <FadeIn delay={0.2}>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-300 mb-1.5 block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                disabled={pending}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {state.errors?.name && (
                <p className="text-red-400 text-sm mt-1.5">
                  {state.errors.name[0]}
                </p>
              )}
            </div>
          </FadeIn>

          {/* Email */}
          <FadeIn delay={0.3}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-300 mb-1.5 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                disabled={pending}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {state.errors?.email && (
                <p className="text-red-400 text-sm mt-1.5">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
          </FadeIn>

          {/* Message */}
          <FadeIn delay={0.4}>
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-neutral-300 mb-1.5 block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                disabled={pending}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent] transition-colors duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {state.errors?.message && (
                <p className="text-red-400 text-sm mt-1.5">
                  {state.errors.message[0]}
                </p>
              )}
            </div>
          </FadeIn>

          {/* Submit */}
          <FadeIn delay={0.5}>
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 px-6 bg-[--color-accent] hover:bg-[--color-accent-hover] text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Sending..." : "Send Message"}
            </button>
          </FadeIn>
        </form>
      </div>
    </SectionWrapper>
  );
}
