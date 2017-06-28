import React from 'react'
import {AutoComplete,Input,Button ,Icon,Select} from 'antd'
import $ from 'jquery'
const Option = Select.Option
let currentSelIndex = -1;
let oldSelIndex = -1;

export class AutoCompompleteInput extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            showInputOption:'none',
            newoptions:[],
            searchText:'',
            showCloseIcon:false,
        }
        this.onChange=this.onChange.bind(this); 
        this.onSelect=this.onSelect.bind(this);
        this.InputOnFocus=this.InputOnFocus.bind(this);         
        this.clearSearchText=this.clearSearchText.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.clickClose(this)
    }

    clickClose(self){
        $("body").click(function(e){
            var _target = $(e.target);
            if (_target.closest(".autoCompompleteInput").length == 0) {
                self.setState({
                    showCloseIcon:false,
                    showInputOption:'none'
                })
                self.clearSelectItem();
            }
        })     
    }

    clearSearchText(){  
        this.setState({
            searchText: '',
            showInputOption:'none'
        })            
        this.clearSelectItem();
        this.props.onSelectCallBack('')
    }

    onSelect(e){
        this.setState({
            searchText:e.currentTarget.innerHTML,
            showInputOption:'none'
        })
        this.props.onSelectCallBack(e.currentTarget.innerHTML)
    }

    InputOnFocus(e){
        this.setState({
           showCloseIcon:true
       })       
    }

    onChange(e){
        const value = e.target.value   
        this.setState({
            searchText:value,
            data: []
        })    
        let result=[];        
        if(!value){
            this.setState({
                showInputOption:'none'
            });      
            return
        }           
        this.props.dataSource.forEach((x)=>{
            if(x.name.replace(/\s/ig,'').toLowerCase().indexOf(value.replace(/\s/ig,'').toLowerCase())>=0){
                result.push(x)
                this.setState({ 
                    data: result
                });    
            }
            this.setState({
                showInputOption:'block',                
            })

        })                            
    }

    selectItem(keyword,event){
        if(keyword==''){
            return;
        }else{
            let Totalcount = this.state.data.length;
            if(event.keyCode == 38 || event.keyCode == 40){
                    if (Totalcount > 0) {
                        oldSelIndex = currentSelIndex;
                        //上移
                        if (event.keyCode == 38) {
                            if (currentSelIndex == -1) {
                                currentSelIndex = Totalcount - 1;
                            }
                            else {
                                currentSelIndex = currentSelIndex - 1;
                                if (currentSelIndex < 0) {
                                    currentSelIndex = Totalcount - 1;
                                }
                            }
                            if (currentSelIndex != -1) {
                                $("#li_" + currentSelIndex).addClass('autoCompompleteInputOptionActive')  
                                this.setState({
                                    searchText: $("#li_" + currentSelIndex).text()
                                })                          
                            }
                            if (oldSelIndex != -1) {
                                $("#li_" + oldSelIndex).removeClass('autoCompompleteInputOptionActive')
                            }
                        }
                        //下移
                        if (event.keyCode == 40) {
                            if (currentSelIndex == Totalcount - 1) {
                                currentSelIndex = 0;
                            }
                            else {
                                currentSelIndex = currentSelIndex + 1;
                                if (currentSelIndex > Totalcount - 1) {
                                    currentSelIndex = 0;
                                }
                            }
                            if (currentSelIndex != -1) {
                                $("#li_" + currentSelIndex).addClass('autoCompompleteInputOptionActive')
                                this.setState({
                                    searchText: $("#li_" + currentSelIndex).text()
                                })  
                            }
                            if (oldSelIndex != -1) {
                                $("#li_" + oldSelIndex).removeClass('autoCompompleteInputOptionActive')
                            }
                        }
                    }
            }else if(event.keyCode == 13){
                this.setState({
                    showInputOption:'none'
                })
                this.clearSelectItem();
                this.props.onSelectCallBack(this.state.searchText)
            }            
        }
    }

    clearSelectItem(){
        $(`#li_${currentSelIndex}`).removeClass('autoCompompleteInputOptionActive');
        currentSelIndex = -1;
        oldSelIndex = -1;       
    }

    clickSearch(){        
        this.props.clickSearchCallBack(this.state.searchText);
    }

    render(){  
        const options = this.state.data.map((d,index) => <li id={`li_${index}`} onClick={this.onSelect} key={ d.id}  value={d.id}>{d.name}</li>); 
        return(
            <div className='autoCompompleteContent'>
                <div className='autoCompompleteBox'>
                    <div className='autoCompompleteInput'>  
                        <Input
                            onChange={this.onChange}
                            placeholder='Search Me'
                            value={this.state.searchText}
                            onFocus={this.InputOnFocus}
                            onKeyUp={this.selectItem.bind(this,'allen')}
                        />
                        {(this.state.showCloseIcon == true)?                    
                                <span  className='autoCompompleteclose' onClick={this.clearSearchText}>
                                    <Icon type="close"  style={{color:'#00CCFF',cursor:'pointer'}}/>
                                </span>:                    
                            ''
                        }                    
                        <div className='autoCompompleteInputOption' style={{display:this.state.showInputOption}}>
                            <ul >
                                {(options.length>0)?
                                    options:
                                    <li>没有数据</li>
                                }
                            </ul>
                        </div>
                    </div>            
                    <Button type="primary" className='autoCompompleteButton' onClick={this.clickSearch} >Search</Button>                    
                </div>  
            </div>

        )
    }
}

export default AutoCompompleteInput;