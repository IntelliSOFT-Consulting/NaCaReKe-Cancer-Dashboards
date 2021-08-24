import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/exporting')(Highcharts);

function BarNegative(props) {
  const { title, type, data1, data2, gcategories,containerDiv } = props;

  useEffect(() => {
    // effect
    var categories = gcategories;

    Highcharts.chart(`${containerDiv}`, {
      chart: {
        type: "bar",
      },
      title: {
        text: `${title}`,
      },
      subtitle: {
        text: "",
      },
      accessibility: {
        point: {
          valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
        },
      },
      exporting: {
        enabled: true,
        // buttons: {
        //   contextButton: {
        //     menuItems: ['downloadPNG', 'downloadSVG', 'separator', 'label']
        //   }
        // }
      },
      
      xAxis: [
        {
          categories: categories,
          reversed: false,
          labels: {
            step: 1,
          },
          accessibility: {
            description: "Age (male)",
          },
        },
        {
          // mirror axis on right side
          opposite: true,
          reversed: false,
          categories: categories,
          linkedTo: 0,
          labels: {
            step: 1,
          },
          accessibility: {
            description: "Age (female)",
          },
        },
      ],
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          formatter: function () {
            return Math.abs(this.value);
          },
        },
        accessibility: {
          description: "Percentage population",
          rangeDescription: "Range: 0 to 5",
        },
      },
      

      plotOptions: {
        series: {
          stacking: "normal",
        },
      },

      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            this.series.name +
            " " +
            this.point.category +
            "</b><br/>" +
            "Cases: " +
            Highcharts.numberFormat(Math.abs(this.point.y), 1)
          );
        },
      },

      series: [data2, data1],
      colors: ['#4169E1', '#d413aa', '#8497b0']
    });
    return () => {
      // cleanup
    };
  }, [data1, data2]);
  return <div id={`${containerDiv}`}></div>;
}

export default BarNegative;
