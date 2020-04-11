import React from 'react'

export default function AttendanceReportItem(props){

    return (<div style={styles.root}>
        <span style={styles.title}>{props.title}</span>
        <div style={styles.content}>
          <span style={styles.subTitle}>{props.subTitle1}</span>
          <span style={styles.subTitle}>{props.subTitle2}</span>
        </div>
      </div>)

}



const styles = {
    root: {
      textAlign:'Center',
      border:"1px solid transparent"
    },
    content:{
        
    },
    title:{
        
    },
    subTitle:{
        border:"1px solid transparent",
        padding:"0 8px"
    }
  };
  