import React, { Fragment, useState } from "react";
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function GeoBar(props) {
    return (
//const GeoBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)
    }

    
var data=
[
  {
    "country": "AD",
    "hot dog": 60,
    "hot dogColor": "hsl(183, 70%, 50%)",
    "burger": 187,
    "burgerColor": "hsl(171, 70%, 50%)",
    "sandwich": 86,
    "sandwichColor": "hsl(194, 70%, 50%)",
    "kebab": 104,
    "kebabColor": "hsl(56, 70%, 50%)",
    "fries": 124,
    "friesColor": "hsl(183, 70%, 50%)",
    "donut": 163,
    "donutColor": "hsl(312, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 61,
    "hot dogColor": "hsl(122, 70%, 50%)",
    "burger": 197,
    "burgerColor": "hsl(70, 70%, 50%)",
    "sandwich": 135,
    "sandwichColor": "hsl(219, 70%, 50%)",
    "kebab": 111,
    "kebabColor": "hsl(15, 70%, 50%)",
    "fries": 123,
    "friesColor": "hsl(71, 70%, 50%)",
    "donut": 135,
    "donutColor": "hsl(170, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 132,
    "hot dogColor": "hsl(100, 70%, 50%)",
    "burger": 108,
    "burgerColor": "hsl(38, 70%, 50%)",
    "sandwich": 68,
    "sandwichColor": "hsl(157, 70%, 50%)",
    "kebab": 0,
    "kebabColor": "hsl(298, 70%, 50%)",
    "fries": 117,
    "friesColor": "hsl(96, 70%, 50%)",
    "donut": 76,
    "donutColor": "hsl(316, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 132,
    "hot dogColor": "hsl(134, 70%, 50%)",
    "burger": 52,
    "burgerColor": "hsl(264, 70%, 50%)",
    "sandwich": 95,
    "sandwichColor": "hsl(78, 70%, 50%)",
    "kebab": 172,
    "kebabColor": "hsl(114, 70%, 50%)",
    "fries": 145,
    "friesColor": "hsl(157, 70%, 50%)",
    "donut": 144,
    "donutColor": "hsl(350, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 153,
    "hot dogColor": "hsl(34, 70%, 50%)",
    "burger": 65,
    "burgerColor": "hsl(35, 70%, 50%)",
    "sandwich": 27,
    "sandwichColor": "hsl(213, 70%, 50%)",
    "kebab": 174,
    "kebabColor": "hsl(76, 70%, 50%)",
    "fries": 134,
    "friesColor": "hsl(315, 70%, 50%)",
    "donut": 71,
    "donutColor": "hsl(23, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 152,
    "hot dogColor": "hsl(311, 70%, 50%)",
    "burger": 200,
    "burgerColor": "hsl(124, 70%, 50%)",
    "sandwich": 52,
    "sandwichColor": "hsl(237, 70%, 50%)",
    "kebab": 80,
    "kebabColor": "hsl(107, 70%, 50%)",
    "fries": 81,
    "friesColor": "hsl(214, 70%, 50%)",
    "donut": 90,
    "donutColor": "hsl(337, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 110,
    "hot dogColor": "hsl(26, 70%, 50%)",
    "burger": 71,
    "burgerColor": "hsl(123, 70%, 50%)",
    "sandwich": 117,
    "sandwichColor": "hsl(20, 70%, 50%)",
    "kebab": 87,
    "kebabColor": "hsl(65, 70%, 50%)",
    "fries": 42,
    "friesColor": "hsl(235, 70%, 50%)",
    "donut": 60,
    "donutColor": "hsl(231, 70%, 50%)"
  }
]