import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions"
import React from "react";
import Task from "./Task";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "./api/tasks-api";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: v1(), title: "html", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
        removeTask: action("removeTask")
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TaskIsDoneStory: Story = {
    args: {
    }
};

export const TaskIsNoteDoneStory: Story = {
    args: {
        task: {id: v1(), title: "html", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
    }
};
