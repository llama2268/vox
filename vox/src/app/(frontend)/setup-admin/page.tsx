import React from 'react'
import Link from 'next/link'

export default function CreateFirstUserPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full p-8 bg-card border border-border rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center">Create First Admin</h1>
                <p className="text-muted-foreground mb-6 text-center">
                    No admin users exist in the system. You can create the first admin account.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/admin/create-first-user"
                        className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center hover:bg-primary/90 transition-colors"
                    >
                        Create Admin Account
                    </Link>

                    <Link
                        href="/admin"
                        className="block w-full px-4 py-3 border border-border rounded-lg font-medium text-center hover:bg-muted transition-colors"
                    >
                        Back to Login
                    </Link>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> This option is only available when{' '}
                        <code className="px-1 py-0.5 bg-background rounded text-xs">
                            ALLOW_INITIAL_ADMIN_CREATION=true
                        </code>{' '}
                        and no admin users exist.
                    </p>
                </div>
            </div>
        </div>
    )
}
