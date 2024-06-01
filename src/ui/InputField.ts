import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import { Input } from '@pixi/ui';

/**
 * Class for rendering a PixiJS logo
 */
export class InputField {
    public view = new Container();

    constructor() {
        const bg = new Graphics()
            .roundRect(0, 0, 393, 368, 0)
            .fill(0xA3B0C6)
        const input = new Input({
            bg: new Graphics()
                .roundRect(0, 0, 361, 269, 15)
                .fill(0xFFFFFF),
            textStyle: {
                fontFamily: 'Andika Regular',
                align: 'center',
                fontSize: 30,
            },
            align: 'center',
            placeholder: '〇〇が好き？',
        });

        // input.onEnter.connect((val) =>
        // {
        //     onChange(`Input ${i + 1} (${val})`);
        // });
        input.x = 16;
        input.y = 76;
        const characterTexture = Texture.from('melting-face');
        const characterSprite = new Sprite(characterTexture);
        characterSprite.scale.set(0.2);
        characterSprite.alpha = 0.1;
        characterSprite.x = 393 - characterSprite.width - 16;
        characterSprite.y = 368 - characterSprite.height - 16;

        this.view.addChild(bg);
        this.view.addChild(input);
        this.view.addChild(characterSprite)
    }
}