import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  relatedLinks?: {
    label: string
    href: string
    icon?: React.ReactNode
  }[]
  className?: string
}

export default function PageHeader({
  title,
  description,
  relatedLinks,
  className
}: PageHeaderProps) {
  const pathname = usePathname()

  return (
    <div className={cn("space-y-4 mb-8", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
          )}
        </div>
        {relatedLinks && relatedLinks.length > 0 && (
          <div className="flex items-center gap-2">
            {relatedLinks.map((link) => (
              <Button
                key={link.href}
                variant="outline"
                size="sm"
                asChild
                className={cn(
                  "flex items-center gap-2",
                  pathname === link.href && "bg-pink-50 text-pink-600 border-pink-200"
                )}
              >
                <a href={link.href}>
                  {link.icon}
                  {link.label}
                </a>
        </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
