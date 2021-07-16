import React, {Component} from 'react';
import Modal from 'react-modal';
import PostItem from './PostItem.js'
import PostForm from './PostForm.js'
import axios from "axios";
import './Posts.css'

class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false, //flag for modal window
            boards: [],
            selectedBoard:{}  //selected board contains one or zero board content to rewrite/remove
        }
    }
    
    openModal = () => {
        this.setState({ isModalOpen: true });
      };
    
    closeModal = () => {
        this.setState({ isModalOpen: false });
      };
    

    componentDidMount() {
        axios.get(`/api/post/`)
        .then(response => {
            this.setState({boards: [...response.data]})
        });
    }
    
    handleSaveData = (data) => {
        console.log("handleSaveData");
        if (!data._id) { // new : Insert
            axios.post(`/api/post/add`, 
                {brddate: new Date(), ...data }
            )
            .then(() => axios.get(`/api/post/`))
            .then(response => {
                this.setState({
                    selectedBoard: {},
                    boards: [...response.data]
                })
            });


        } else {                                                        // Update

            axios.post(`/api/post/update`, {
                brddate: new Date(), ...data
            })
            .then(() => axios.get(`/api/post/`))
            .then(response => {
                this.setState({
                    selectedBoard: {},
                    boards: [...response.data]
                })
            });
        }

        this.closeModal();
    }

    onBackButtonClicked = () => {
        this.closeModal();
    }
    
    handleRemove = (_id) => {
        axios.post(`/api/post/remove`, {_id: _id})
        .then(() => axios.get(`/api/post/`))
        .then(response => {
            this.setState({
                selectedBoard: {},
                boards: [...response.data]
            })
        });
    }
    
    handleSelectRow = (row) => {
        this.setState({selectedBoard:row});
        console.log("selectedRow is "+ row.brdtitle);
        this.openModal();
    }


    
    render() {
            const { boards , selectedBoard} = this.state;
            
            return (
                <div>
                    <div className = "modal_btn_wraper">
                        <button onClick={this.openModal} className = "plus_btn"><img className = "plus_btn_img" src = "/img/addBtn.png"></img></button>
                    </div>
                    <div className = "modal_wraper">
                        <Modal isOpen={this.state.isModalOpen} close={this.closeModal} >
                            <PostForm selectedBoard = {selectedBoard} onSaveData={this.handleSaveData} onBackButtonClicked={this.onBackButtonClicked}/>
                        </Modal>
                        </div>
                    <h3 className= "page_title">
                        <img className = "main_img" src= "/img/house.png"></img>
                        <em className="main_text">
                            자유게시판
                        </em>
                        <span className="detail_text">
                            가장 빠른 기숙사 새소식 업데이트
                        </span>
                    </h3> 
                    
                    <ul id = "postsList">
                    { 
                                boards.map(row => 
                                    (<PostItem key={row._id} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow}/>) 
                                )
                            } 
                    </ul>
                </div>
            );
        }
}
export default Posts;
