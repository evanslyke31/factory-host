import * as React from "react"
import { TextField } from "@mui/material";
import '../styles/buy.scss'

class BuyPage extends React.Component {

    constructor(props) {
        super(props);

        const params = new URLSearchParams(props.location.search);
        this.id = params.get("id");

        this.plans = { 0: { content: 'Low Tier', size: '8', price: 15 }, 1: { content: 'Mid Tier', size: '12', price: 20 }, 2: { content: 'High Tier', size: '16', price: 25 } }
        this.plan = this.plans[this.id];
    }

    render() {
        return (
            <div className={'flex gap-6 mt-16 justify-center mb-6'}>
                <div className="plan-description">
                    <div className="title mb-2">Plan Description</div>
                    <div className="ml-4">
                        <div className="content">{this.plan.content}</div>
                        <div>RAM: {this.plan.size} GB</div>
                        <div>Price: ${this.plan.price}.00 / mo</div>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="buy-form">
                        <div className="title mb-2">Contact</div>
                        <div className="pl-4">
                            <TextField id="outlined-basic" label="Email" variant="outlined" />
                        </div>
                    </div>
                    <div className="buy-button">
                        <button>Purchase</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuyPage