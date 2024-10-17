/**
 * @fileoverview Configures the Storybook preview settings, including control
 * matchers and documentation layout. Defines the structure for story
 * documentation pages using Storybook Blocks components.
 */

import { Preview } from "@storybook/react";
import React from "react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/blocks";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <h2>Props</h2>
                    <Controls />
                    <Stories />
                </>
            ),
        },
    },
};

export default preview;
