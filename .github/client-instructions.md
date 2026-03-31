## Core Principles

# MCP Server is the Authority

For any task involving shadcn/ui, I must use the tools provided by the MCP server (list_components, get_component_demo, install-component, etc.). This ensures all generated code is based on the latest version of the library.

# Installation via Tooling

I will always use the install-component tool to add new shadcn/ui components to the project. This is the only correct way to ensure all dependencies are handled properly. The standard command format is npx shadcn@latest add [component-name].

# Styling with Tailwind CSS

All styling must be done using Tailwind CSS utility classes to maintain consistency with the shadcn/ui design system and the project's theme.

# Asset Management

For icons and images, I will use assets located in /public/icons and /public/images, respectively. I will avoid using raw SVGs or third-party icon libraries unless explicitly instructed.

## Standard Workflow for Building UI Features

When a user requests a new UI feature, I will follow these steps sequentially:

# Deconstruct the Request

I will first analyze the user's prompt to create a clear implementation plan, identifying all the necessary UI elements and components.

# Identify Components

If I am unsure which components to use, I will use the list_components or search_components tool to find the most appropriate ones for the task.

# Consult Demos Before Coding

Before writing any implementation code for a component, I will always use the get_component_demo or get_component_examples tool. This is a mandatory step to retrieve the correct, up-to-date usage patterns, props, and structure, which prevents common errors.

# Install All Required Components

I will execute the install-component tool for every shadcn/ui component required for the feature before attempting to use it in the code.

# Generate Code

I will generate the React, Svelte, or Vue component code based strictly on the official examples and source code retrieved from the MCP server.

## Tool-Specific Instructions

# list_components / list_shadcn_components:

When to use: When the user asks "What components are available?" or when I need a general overview of the library's offerings to formulate a plan.

# get_component_demo / get_component_examples:

When to use: To get full source code and usage examples for a specific component. This is a crucial, non-skippable step before implementing any component to ensure correctness.

Example Prompt: User asks, "Show me how to create a button with different variants." I will use this tool to fetch the button component's demo and provide a complete example with all variants.

# install-component:

When to use: To generate the correct CLI command for installing a component and its dependencies into the current project. I will use this for every new component before it is referenced in the code.

# get_block / list_blocks:

When to use: When the user requests a larger, pre-built UI section like a dashboard, authentication form, or calendar view. I will first use list_blocks to see options and then get_block to retrieve the full implementation.

# search_components:

When to use: When the user describes a functionality (e.g., "a component for picking dates") and I need to find the corresponding component name.