'use client';

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const Dialog = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { open?: boolean, onOpenChange?: (open: boolean) => void }>(
    ({ children, open: controlledOpen, onOpenChange: controlledOnOpenChange, ...props }, ref) => {
        const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
        const isControlled = controlledOpen !== undefined
        const open = isControlled ? controlledOpen : uncontrolledOpen
        const onOpenChange = isControlled ? controlledOnOpenChange : setUncontrolledOpen

        // Context for children
        return (
            <DialogContext.Provider value={{ open, onOpenChange }}>
                {open && (
                    <div className="fixed inset-0 z-40 flex items-start justify-center sm:items-center bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange?.(false)}>
                        {/* Overlay */}
                    </div>
                )}
                {children}
            </DialogContext.Provider>
        )
    }
)
Dialog.displayName = "Dialog"

const DialogContext = React.createContext<{ open?: boolean, onOpenChange?: (open: boolean) => void } | null>(null)

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
    ({ className, onClick, children, asChild, ...props }, ref) => {
        const context = React.useContext(DialogContext)

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e)
            context?.onOpenChange?.(true)
        }

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: handleClick,
                className: cn(className, (children as React.ReactElement<any>).props.className)
            })
        }

        return (
            <button ref={ref} className={cn(className)} onClick={handleClick} {...props}>
                {children}
            </button>
        )
    }
)
DialogTrigger.displayName = "DialogTrigger"

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const context = React.useContext(DialogContext)
        if (!context?.open) return null

        return (
            <div
                ref={ref}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
                    className
                )}
                {...props}
            >
                <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer" onClick={() => context.onOpenChange?.(false)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </div>
                {children}
            </div>
        )
    }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = "DialogDescription"

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
}
