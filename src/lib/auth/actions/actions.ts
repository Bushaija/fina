"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

// Validate sign-in input
const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    pwd: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signIn(formData: FormData): Promise<void> {
    try {
        // Extract and validate form data
        const email = formData.get("email") as string;
        const password = formData.get("pwd") as string;
        
        // Validate input
        const result = signInSchema.safeParse({ email, pwd: password });
        if (!result.success) {
            // Handle validation errors
            throw new Error("Invalid email or password format");
        }
        
        // Make a POST request to the auth API endpoint
        const response = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Authentication failed");
        }
        
        // Redirect to dashboard on success
        redirect("/dashboard");
    } catch (error) {
        console.error("Sign in error:", error);
        // This will cause the form submission to fail and can be handled by error boundaries
        throw new Error("Authentication failed. Please check your credentials.");
    }
}

// Validate sign-up input
const signUpSchema = z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    pwd: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signUp(formData: FormData): Promise<void> {
    try {
        // Extract and validate form data
        const email = formData.get("email") as string;
        const password = formData.get("pwd") as string;
        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        
        // Validate input
        const result = signUpSchema.safeParse({ 
            email, 
            pwd: password,
            firstname,
            lastname
        });
        
        if (!result.success) {
            throw new Error("Invalid registration data");
        }
        
        // Make a POST request to the auth API endpoint
        const response = await fetch("/api/auth/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                userData: {
                    name: `${firstname} ${lastname}`,
                },
            }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Registration failed");
        }
        
        // Redirect to verification page or dashboard
        redirect("/verification");
    } catch (error) {
        console.error("Sign up error:", error);
        throw new Error("Registration failed. Please try again.");
    }
}

// Validate forgot password input
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export async function forgotPassword(formData: FormData): Promise<void> {
    try {
        // Extract and validate email
        const email = formData.get("email") as string;
        
        // Validate input
        const result = forgotPasswordSchema.safeParse({ email });
        if (!result.success) {
            throw new Error("Invalid email format");
        }
        
        // Make a POST request to the auth API endpoint
        const response = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to send password reset email");
        }
        
        // Redirect to confirmation page
        redirect("/password-reset-sent");
    } catch (error) {
        console.error("Forgot password error:", error);
        throw new Error("Failed to send password reset email. Please try again.");
    }
}

// Validate reset password input
const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirmation password is required"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export async function resetPassword(formData: FormData): Promise<void> {
    try {
        // Extract and validate form data
        const token = formData.get("token") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        
        // Validate input
        const result = resetPasswordSchema.safeParse({ 
            token, 
            password,
            confirmPassword
        });
        
        if (!result.success) {
            throw new Error(result.error.errors[0].message || "Invalid password reset data");
        }
        
        // Make a POST request to the auth API endpoint
        const response = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                password,
            }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to reset password");
        }
        
        // Redirect to sign-in page on success
        redirect("/sign-in?reset=success");
    } catch (error) {
        console.error("Reset password error:", error);
        throw new Error("Failed to reset your password. Please try again.");
    }
}

