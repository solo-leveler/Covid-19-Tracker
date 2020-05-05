import React from 'react';
import { Cards, Chart , CountryPicker } from './components';
import styles  from './App.module.css';
import { fetchData } from './api';
import titleImage from './images/image.png'; 
import { Paper ,Switch  } from '@material-ui/core';
import {ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TouchAppIcon from '@material-ui/icons/TouchApp';



class App extends React.Component{
           
    state = {
        darkMode : false,
        data : {},
        country : '',
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState ({ data :fetchedData })
    }

    handleCountryChange = async(country) => {
        const fetchedData = await fetchData(country);
        this.setState({data:fetchedData , country :country});
        
    }
    render(){
        const { data ,country,darkMode } = this.state;
        const theme = createMuiTheme ({
            palette:{
               type: darkMode ? "dark" : "light",
            },
          });
  
        return(
            <ThemeProvider theme = { theme}>
                <Paper>
                    <div className={styles.container}  >
                        <img className={styles.image} src={titleImage} alt="COVID-19" />
                        <Switch checked ={darkMode} onChange = {() => this.setState({darkMode: !darkMode}) } />
                        <TouchAppIcon />
                        Check Out our Dark Mode Now 
                        <Cards  data= {data} />
                        <CountryPicker handleCountryChange = {this.handleCountryChange}  />
                        <Chart  data={data} country ={country } />
                        
                   </div>
                </Paper>
            </ThemeProvider> 
       )
    }
}

export default App;