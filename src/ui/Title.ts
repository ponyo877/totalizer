import { Container, Text } from 'pixi.js';

import { i18n } from '../utils/i18n';

/**
 * Class to render the game's title
 */
export class Title {
    /* The container instance that is the root of all visuals in this class */
    public view = new Container();

    constructor() {
        // Create main header

        // Add top part of the title
        const mainTitleText = i18n.t('mainTitle');

        const topWrapper = new Container();
        const titleTop = new Text({
            text: mainTitleText,
            style: {
                fontSize: 90,
                fontWeight: '900',
                fontFamily: 'Andika Regular',
            },
        });

        titleTop.anchor.set(0.5);
        topWrapper.addChild(titleTop);
        this.view.addChild(topWrapper);

        // Create sub header
        const subtitle = new Text({
            text: i18n.t('subTitle'),
            style: {
                fontSize: 32,
                fontWeight: '900',
                fontFamily: 'Andika Regular',
            },
        });

        subtitle.anchor.set(0.5);
        subtitle.y = topWrapper.y + topWrapper.height - 30;
        this.view.addChild(subtitle);
    }
}
