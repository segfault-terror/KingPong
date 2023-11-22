import p5Types from 'p5';

export class Score {
    top: number;
    bottom: number;
    constructor(top: number, bottom: number) {
        this.top = top;
        this.bottom = bottom;
    }

    show(
        p5: p5Types,
        top: number,
        bottom: number,
        serverClientRatio: { width: number; height: number },
    ) {
        p5.push();
        p5.textSize(40 * serverClientRatio.width);
        p5.fill(255,231,45, 140);
        p5.textStyle(p5.BOLD);
        p5.text(
            top,
            30 * serverClientRatio.width,
            p5.height / 2 - 30 * serverClientRatio.height,
        );
        p5.text(
            bottom,
            p5.width - 60 * serverClientRatio.width,
            p5.height / 2 + 70 * serverClientRatio.height,
        );
        p5.pop();
    }
}
