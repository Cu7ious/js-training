const dummyText = [
    "Lorem ipsum {dolor Right} sit amet",
    "Lorem ipsum dolor sit {amet Left}",
    "{Lorem Right} ipsum dolor sit amet",
    "Lorem ipsum dolor sit {amet Left}",
    "Lorem ipsum {dolor Right} sit amet",
    "Lorem ipsum dolor sit {amet Left}",
    "{Lorem Right} ipsum dolor sit amet",
    "Lorem ipsum {dolor Right} sit amet",
    "Lorem ipsum {dolor Right} sit amet",
    "Lorem ipsum dolor sit {amet Left}",
    "{Lorem Right} ipsum dolor sit amet",
    "Lorem ipsum dolor sit {amet Top}"
]

function parseTemplateString (str) {
    const stack = [];
    const len = str.length;

    str.split('').forEach((el, idx) => {
        if (idx === len - 1 && stack.length % 2 && el !== "}") {
            console.error("Missing substring separator");
            return;
        }

        if (el === "{" || el === "}") {
            stack.push(idx);
        }
    });

    return stack;
}

class ButtonWithTooltip extends React.Component {
    constructor() {
        super();
        this.state = {
            tooltipDisplay: "none",
            tooltipX: 0,
            tooltipY: 0
        }

        this.button = React.createRef();

        this.handleHover = this.handleHover.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    handleMove(e) {
        const paddingX = 20;
        const safety = 15;
        const tooltip = {
            w: 50,
            h: 20
        };

        const stage = this.props.stage;

        let X = e.clientX + paddingX;
        let Y = e.clientY;

        // right colision
        if (stage.right - (e.clientX + paddingX) <= tooltip.w) {
            X = e.clientX - paddingX - tooltip.w;
        }

        // bottom colision
        if (stage.bottom - (e.clientY + safety) <= tooltip.h) {
            Y = e.clientY - tooltip.h;
        }

        this.setState({
            tooltipX: X,
            tooltipY: Y
        });
    }

    handleHover(e) {
        this.setState({tooltipDisplay: "block"});
    }

    handleLeave(e) {
        this.setState({tooltipDisplay: "none"});
    }

    render() {
        const spanStyles = {
            display: this.state.tooltipDisplay,
            top: this.state.tooltipY,
            left: this.state.tooltipX
        };

        return (
            <button
                ref={this.button}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleLeave}
                onMouseMove={this.handleMove}
            >
                <span style={spanStyles}>
                    {this.props.tooltipText}
                </span>
                {this.props.children}
            </button>
        )
    }
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            stageRect: null
        };

        this.stage = React.createRef();
        this.handleHover = this.handleHover.bind(this);
    }

    handleHover(e) {
        // sets it once, after only reuses
        if (!this.state.stageRect) {
            this.setState({stageRect: e.target.getBoundingClientRect()});
        }

        return;
    }

    renderButton(txt) {
        const [btnText, tooltipText] = txt.split(' ');

        return (<ButtonWithTooltip
            tooltipText={tooltipText}
            stage={this.state.stageRect}
        >
        {btnText}
        </ButtonWithTooltip>);
    }

    renderDummyText(text) {
        return text.map((el, idx) => {
            const idxs = parseTemplateString(el);
            const button = this.renderButton(el.slice(idxs[0] + 1, idxs[1]));
            const paragraph = el.split(el.slice(idxs[0], idxs[1] + 1));
            
            if (paragraph[0] === "") {
                paragraph[0] = button;
            } else if (paragraph[1] === "") {
                paragraph[1] = button;
            } else {
                paragraph.push(paragraph[1]);
                paragraph[1] = button;
            }
            
            return (
                <p key={idx}>
                    {paragraph}
                </p>
            );
        })
    }

    render() {
        return (
            <div className="stage" onMouseEnter={this.handleHover}>
                {this.renderDummyText(dummyText)}
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)