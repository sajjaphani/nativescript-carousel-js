const observableModule = require("data/observable");
const topmost = require("ui/frame").topmost;
let builder = require("ui/builder");
const { GridLayout, GridUnitType, ItemSpec } = require("ui/layouts/grid-layout");
const { Animation } = require('ui/animation');
const { screen } = require("platform");

const slidesView = require('./slides-view');

function WelcomeViewModel(slideContentView) {
    slideContentView.content = slidesView;

    const viewModel = observableModule.fromObject({
        slideContentView: slideContentView,
        currentSlideNum: 0,
        slideCount: 3,
        slidesView: slidesView,
        screenWidth: screen.mainScreen.widthDIPs,
        skipIntro() {
            topmost().navigate("./home/home-page");
        },
        onSwipe(args) {
            let prevSlideNum = this.currentSlideNum;
            let count = this.slideCount;
            if (args.direction == 2) {
                this.currentSlideNum = (this.currentSlideNum + 1) % count;
            } else if (args.direction == 1) {
                this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
            } else {
                // We are interested in left and right directions
                return;
            }

            const currSlide = this.slidesView.getChildAt(prevSlideNum);
            const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
            this.animate(currSlide, nextSlide, args.direction);
        },
        animate(currSlide, nextSlide, direction) {
            nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
            nextSlide.opacity = 1;
            var definitions = new Array();
            definitions.push({
                target: currSlide,
                translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
                duration: 500
            });

            definitions.push({
                target: nextSlide,
                translate: { x: 0, y: 0 },
                duration: 500
            });

            var animationSet = new Animation(definitions);
            animationSet.play().then(() => {
                // console.log("Animation finished");
            })
                .catch((e) => {
                    console.log(e.message);
                });
        },
        getSliderItemClass(item) {
            if (item == this.currentSlideNum)
                return "caro-item-dot caro-item-dot-selected";

            return "caro-item-dot";
        }
    });

    return viewModel;
}

module.exports = WelcomeViewModel;
