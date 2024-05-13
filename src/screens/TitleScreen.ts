import gsap from 'gsap';
import { Container, Texture, TilingSprite } from 'pixi.js';

import { designConfig } from '../game/designConfig';
import type { AppScreen } from '../navigation';
import { navigation } from '../navigation';
import { PrimaryButton } from '../ui/buttons/PrimaryButton';
import { Title } from '../ui/Title';
import { i18n } from '../utils/i18n';
import { LoadScreen } from './LoadScreen';

/** The screen presented at the start, after loading. */
export class TitleScreen extends Container implements AppScreen {
    /** A unique identifier for the screen */
    public static SCREEN_ID = 'title';
    /** An array of bundle IDs for dynamic asset loading. */
    public static assetBundles = ['images/title-screen'];

    /** A background visual element */
    private readonly _background: TilingSprite;

    private _title!: Title;
    private _playBtn!: PrimaryButton;
    /** A container to group visual elements for easier animation */
    private _topAnimContainer = new Container();
    /** A container to group visual elements for easier animation */
    private _midAnimContainer = new Container();
    /** A container to group visual elements for easier animation */
    private _bottomAnimContainer = new Container();

    constructor() {
        super();

        // Create the background
        this._background = new TilingSprite({
            texture: Texture.from('background-tile'),
            width: 64,
            height: 64,
            tileScale: {
                x: designConfig.backgroundTileScale,
                y: designConfig.backgroundTileScale,
            },
            interactive: true,
        });
        this.addChild(this._background);

        // Add visual details like footer, cannon, portholes
        this._buildDetails();

        // Add buttons like the play button and audio button
        this._buildButtons();

        // Add all parent containers to screen
        this.addChild(this._topAnimContainer, this._midAnimContainer, this._bottomAnimContainer);
    }

    /** Called before `show` function, can receive `data` */
    public prepare() {
        // Reset the positions of the group containers
        gsap.set(this._topAnimContainer, { y: -350 });
        gsap.set(this._midAnimContainer, { x: 200 });
        gsap.set(this._bottomAnimContainer, { y: 350 });
    }

    /** Called when the screen is being shown. */
    public async show() {
        // Kill tweens of the screen container
        gsap.killTweensOf(this);

        // Reset screen data
        this.alpha = 0;

        // Tween screen into being visible
        await gsap.to(this, { alpha: 1, duration: 0.2, ease: 'linear' });

        // The data to be used in the upcoming tweens
        const endData = {
            x: 0,
            y: 0,
            duration: 0.75,
            ease: 'elastic.out(1, 0.5)',
        };

        // Tween the containers back to their original position
        gsap.to(this._topAnimContainer, endData);
        gsap.to(this._midAnimContainer, endData);
        gsap.to(this._bottomAnimContainer, endData);
    }

    /** Called when the screen is being hidden. */
    public async hide() {
        // Kill tweens of the screen container
        gsap.killTweensOf(this);

        // Tween screen into being invisible
        await gsap.to(this, { alpha: 0, duration: 0.2, ease: 'linear' });
    }

    /**
     * Gets called every time the screen resizes.
     * @param w - width of the screen.
     * @param h - height of the screen.
     */
    public resize(w: number, h: number) {
        // Fit background to screen
        this._background.width = w;
        this._background.height = h;

        // Set visuals to their respective locations

        this._title.view.x = w * 0.5;
        this._title.view.y = 145;

        this._playBtn.x = w * 0.5;
        this._playBtn.y = h - this._playBtn.height / 2 + 10;
    }

    /** Add visual details to title screen. */
    private _buildDetails() {
        // Add the title card
        this._title = new Title();
        this._topAnimContainer.addChild(this._title.view);
    }

    /** Add buttons to screen. */
    private _buildButtons() {
        this._playBtn = new PrimaryButton({
            text: i18n.t('titlePlay'),
        });

        this._playBtn.onPress.connect(() => {
            // Go to game screen when user presses play button
            navigation.goToScreen(LoadScreen);
        });

        this._bottomAnimContainer.addChild(this._playBtn);
    }
}
