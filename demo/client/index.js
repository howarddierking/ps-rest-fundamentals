// create a welcome component
function Welcome(props){
    return <h1>Hello {props.name}</h1>;
}

// create a self-contained, updating clock component
function Clock(props){
    return (
        <div>
            <h1>Hello World!</h1>
            <h2>It is {props.date.toLocaleTimeString()}</h2>
        </div>
    );
}

// const element = <Welcome name="Howard"></Welcome>;

// ReactDOM.render(element, document.getElementById('container'));

function tick(){
    ReactDOM.render(
        <Clock date={new Date()}></Clock>,
        document.getElementById('container')
    );
}

setInterval(tick, 1000);
