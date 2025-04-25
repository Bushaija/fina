#!/bin/bash

# List of components
components=(
    "collapsible"
    "sidebar"
  )

# Loop through each component and install it
for component in "${components[@]}"; do
    echo "Installing $component..."
    echo yes | pnpm dlx shadcn@latest add $component
    echo "$component installed!"
done

echo "All components installed successfully!"