import type { ButtonOptions } from '@pixi/ui';
import { FancyButton } from '@pixi/ui';
import type { Container, TextStyle, ColorSource } from 'pixi.js';
import { Graphics, Text } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';

import { sfx } from '../../audio';

/**
 * Options for the primary button.
 */
export interface PrimaryButtonOptions {
    icon?: Container;
    /** The text displayed on the button. */
    text: string;
    backgroundColor?: ColorSource;
    /** Style properties for the text displayed on the button. */
    textStyle?: Partial<TextStyle>;
    /** Options for the underlying button component. */
    buttonOptions?: ButtonOptions;
}

/** Constant to define the default scale of the button */
const DEFAULT_SCALE = 1;

export class PrimaryButton extends FancyButton {
    /**
     * @param options - Options for the primary button.
     */
    constructor(options: PrimaryButtonOptions) {
        // Create text object to act as label
        const text = new Text({
            text: options?.text ?? '',
            style: {
                // Predefine text styles that can be overwritten
                fontFamily: 'Andika Regular',
                align: 'center',
                fontSize: 30,
                // Allow custom text style to overwrite predefined options
                ...options?.textStyle,
            },
        });

        let buttonGraphics = new Graphics().roundRect(0, 0, 260, 88, 15).fill(options?.backgroundColor ?? 0xFFFFFF);
        let shadow = new DropShadowFilter();
        shadow.alpha = 0.25;
        shadow.resolution = 100;
        buttonGraphics.filters = [shadow];
        super({
            // Assign the default view
            defaultView: buttonGraphics,
            // Assign the pressed view
            pressedView: new Graphics().roundRect(0, 0, 260, 88, 15).fill(0xFFFFFF),
            // Assign button text
            icon : options.icon,
            iconOffset: {
                x: 0,
                y: 0,
            },
            text,
            // Offset the button text
            textOffset: {
                default: {
                    y: 0,
                },
                pressed: {
                    y: 10,
                },
            },
            // Anchor to the center-bottom
            anchorX: 0.5,
            anchorY: 1,
            // Set initial scale to default scale
            scale: DEFAULT_SCALE,
            // Allow custom button options to overwrite predefined options
            ...options.buttonOptions,
        });

        this.onPress.connect(() => {
            sfx.play('audio/primary-button-press.wav');
        });
    }
}
