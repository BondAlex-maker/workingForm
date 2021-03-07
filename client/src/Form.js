import React, {Component} from 'react';
import axios from "axios";


class Form extends Component {

    state={
        name:'',
        email:'',
        subject:'',
        message:'',
        sent: false
    }

    //Handle inputs
        handleName = (e) =>{
        this.setState({
            name:e.target.value
})
        }

    handleEmail = (e) =>{
        this.setState({
            email:e.target.value
        })
    }

    handleSubject = (e) =>{
        this.setState({
            subject:e.target.value
        })
    }

    handleMessage = (e) =>{
        this.setState({
            message:e.target.value
        })
    }
    //End of handle inputs


    formSubmit=(e)=>{
        e.preventDefault();

        let data = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        }

        axios.post('/api/forma', data)
            .then(res=>{
                this.setState({
                    sent:true
                },this.resetForm())
            }).catch(()=>{
        console.log('message not sent');
        })
     }
        //for resetting initial data
    resetForm=()=>{
        this.setState({
            name:'',
            email:'',
            subject: '',
            message: ''
        })

        setTimeout(()=>{
            this.setState({
                sent:false,
            })
        }, 3000)
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.formSubmit}>
                    {/*single item*/}
                    <div className="singleItem">
                        <label htmlFor="name">Name*</label>
                        <input
                            type="text"
                            name="name"
                            className="name"
                            value={this.state.name}
                            onChange={this.handleName}
                        />
                    </div>
                    {/*end of single item*/}
                    {/*single item*/}
                    <div className="singleItem">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="text"
                            name="email"
                            className="email"
                            required
                            value={this.state.email}
                            onChange={this.handleEmail}/>
                    </div>
                    {/*end of single item*/}
                    {/*single item*/}
                    <div className="singleItem">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            className="subject"
                            value={this.state.subject}
                            onChange={this.handleSubject}
                        />
                    </div>
                    {/*end of single item*/}
                    {/*single item*/}
                    <div className="textArea singleItem">
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id=""
                            cols="30"
                            rows="5"
                            value={this.state.message}
                            onChange={this.handleMessage}>
                            
                        </textarea>
                    </div>
                    {/*end of single item*/}
                    <div className={this.state.sent ? 'msg msgAppear' : 'msg'}>Message has been sent
                    </div>
                    <div className="btn">
                        <button type="submit">Send</button>
                    </div>
                </form>
                
            </div>
        );
    }
}

export default Form;