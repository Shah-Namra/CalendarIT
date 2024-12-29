import { CloudRain } from "lucide-react";

const features = [
  {
    name: "Free sign-up",
    description:
      "Getting started is easy and free! Create an account in just a few simple steps and start scheduling right away.",
    icon: CloudRain,
  },
  {
    name: "Blazing fast performance",
    description:
      "Experience unmatched speed. Schedule meetings in seconds with our optimized platform that ensures minimal loading time and maximum efficiency.",
    icon: CloudRain,
  },
  {
    name: "Top-tier security with Nylas",
    description:
      "Your data's security is our top priority. With Nylas integration, we ensure that your information is always protected with industry-leading security measures.",
    icon: CloudRain,
  },
  {
    name: "User-friendly interface",
    description:
      "Scheduling meetings has never been easier. Our intuitive interface allows you to book, manage, and organize meetings effortlessly.",
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule meetings in minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With ScheduleIT, you can schedule meetings effortlessly. We simplify the process, making it quick and easy to connect with others.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
