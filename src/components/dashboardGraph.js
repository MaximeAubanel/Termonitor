import React, { Component } from "react";

// Import Material UI
import { Typography, withStyles, Grid, Paper, Divider } from "@material-ui/core";

import { chartStyle, style } from "./dashboardGraphCss";
import ReactApexChart from "react-apexcharts";

class DashboardGraph extends Component {
  render() {
    const { classes } = this.props;
    const timeArray = [];
    const reportedHashrateArray = [];
    const currentHashrateArray = [];
    let min = 10000000000000;
    let max = 0;
    const statistics = this.props.data.data.statistics;

    if (!this.props.data.data.statistics) {
      return <div>loasssding</div>;
    }

    console.log(statistics);
    statistics.forEach(statistic => {
      let r = parseFloat(statistic.reportedHashrate);
      if (r > max) max = r;
      if (r < min) min = r;
      let c = parseFloat(statistic.currentHashrate);
      if (c > max) max = c;
      if (c < min) min = c;
      timeArray.push(statistic.time);
      reportedHashrateArray.push(statistic.reportedHashrate);
      currentHashrateArray.push(statistic.currentHashrate);
    });
    console.log(max + "--" + min);
    chartStyle.options.xaxis.categories = timeArray;
    chartStyle.options.yaxis.max = max + 50;
    chartStyle.options.yaxis.min = min - 50;
    chartStyle.series = [
      {
        name: "Reported Hashrate",
        data: reportedHashrateArray
      },
      {
        name: "Current Hashrate",
        data: currentHashrateArray
      }
    ];

    return (
      <Grid item xs={this.props.xs}>
        <Paper className={classes.card}>
          <Grid justify="space-between" container className={classes.cardHeaderContainer}>
            <Typography className={classes.cardHeaderTitle} variant="h6">
              {this.props.title}
            </Typography>
          </Grid>
          <Divider className={classes.divider} />
          {this.props.content ? (
            this.props.content
          ) : (
            <ReactApexChart
              options={chartStyle.options}
              series={chartStyle.series}
              type="area"
              height="300"
            />
          )}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(style)(DashboardGraph);
