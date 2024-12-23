'use client';

import React, {useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./toolbar.css";

class ColumnData implements DayPilot.CalendarColumnData {
    id: string = "";
    name: string = "";
    blocked?: boolean;
}


export default function ResourceCalendar() {
    

    const [calendar, setCalendar] = useState<DayPilot.Calendar>();
    const [datePicker, setDatePicker] = useState<DayPilot.Navigator>();

    const [events, setEvents] = useState<DayPilot.EventData[]>([]);
    const [columns, setColumns] = useState<ColumnData[]>([]);
    const [startDate, setStartDate] = useState<string|DayPilot.Date>();
console.log(calendar);
    const styles = {
        wrap: {
            display: "flex"
        },
        left: {
            marginRight: "10px"
        },
        main: {
            flexGrow: "1"
        }
    };

    const colors = [
        { name: "Dark Green", id: "#228B22" },
        { name: "Green", id: "#6aa84f" },
        { name: "Yellow", id: "#f1c232" },
        { name: "Orange", id: "#e69138" },
        { name: "Crimson", id: "#DC143C" },
        { name: "Light Coral", id: "#F08080" },
        { name: "Purple", id: "#9370DB" },
        { name: "Turquoise", id: "#40E0D0" },
        { name: "Light Blue", id: "#ADD8E6" },
        { name: "Sky Blue", id: "#87CEEB" },
        { name: "Blue", id: "#3d85c6" },
    ];


    const editEvent = async (e: DayPilot.Event) => {
        const form = [
            {name: "Event text", id: "text", type: "text"},
            {name: "Event color", id: "tags.color", type: "select", options: colors},
         
        ];

        const modal = await DayPilot.Modal.form(form, e.data);
        if (modal.canceled) { return; }

        const updatedEvent = modal.result;

        calendar?.events.update(updatedEvent);
    };

    const contextMenu = new DayPilot.Menu({
        items: [
            {
                text: "Delete",
                onClick: async args => {
                    calendar?.events.remove(args.source);
                },
            },
            {
                text: "-"
            },
            {
                text: "Edit...",
                onClick: async args => {
                    await editEvent(args.source);
                }
            }
        ]
    });

    const onBeforeHeaderRender = (args: DayPilot.CalendarBeforeHeaderRenderArgs) => {
      
        args.header.areas = [
            {
                right: 5,
                top: "calc(50% - 10px)",
                width: 20,
                height: 20,
                action: "ContextMenu",
                symbol: "icons/daypilot.svg#threedots-v",
                style: "cursor: pointer",
                toolTip: "Show context menu",
                borderRadius: "50%",
                backColor: "#00000033",
                fontColor: "#ffffff",
                padding: 2,
                menu: new DayPilot.Menu({
                    onShow: async args => {
                        const column = columns.find(c => c.id === args.source.id);
                        const items = args.menu.items || [];
                        if (column?.blocked) {
                            items[0].text = "Unblock";
                        }
                        else {
                            items[0].text = "Block";
                        }
                    },
                    items: [
                        {
                            text: "Block",
                            onClick: async (args) => {
                                const updatedColumns = columns.map(c =>  c.id === args.source.id ? { ...c, blocked: !c.blocked } : c);
                                setColumns(updatedColumns);
                            }
                        },
                        {
                            text: "Edit",
                            onClick: async (args) => {
                                const column = columns.find(c => c.id === args.source.id);
                                if (!column) {
                                    return;
                                }
                                const modal = await DayPilot.Modal.prompt("Edit column name:", column.name);
                                if (modal.canceled) {
                                    return;
                                }
                                const updatedColumns = columns.map(c =>  c.id === args.source.id ? { ...c, name: modal.result } : c);
                                setColumns(updatedColumns);
                            }
                        },
                        {
                            text: "Delete",
                            onClick: async (args) => {
                                const updatedColumns = columns.filter(c => c.id !== args.source.id);
                                setColumns(updatedColumns);
                            }
                        }
                    ]
                })
            }
        ];
    };

    const onBeforeCellRender = (args: DayPilot.CalendarBeforeCellRenderArgs) => {
        const column = columns.find(c => c.id === args.cell.resource);
        if (column?.blocked) {
            args.cell.properties.backColor = "#f0f0f0";
        }
    };

    const onBeforeEventRender = (args: DayPilot.CalendarBeforeEventRenderArgs) => {
        const color = args.data.tags && args.data.tags.color || "#3d85c6";
        args.data.backColor = color + "cc";
        args.data.borderColor = "darker";

    
      
            
    };

    const onTodayClick = () => {
        datePicker?.select(DayPilot.Date.today());
    console.log(DayPilot.Date.today());
    const columns: ColumnData[] = [
        {name: ''+a.toString().substring(0,10), id: "R1"},
       
    ];
    setColumns(columns);
    };

    const onPreviousClick = () => {
        const previous = new DayPilot.Date(startDate).addDays(-1);
        datePicker?.select(previous);
        console.log(previous);
        a=previous;
        console.log(a);
        const columns: ColumnData[] = [
            {name: ''+a.toString().substring(0,10), id: "R1"},
           
        ];
        setColumns(columns);

    };

    const onNextClick = () => {
        const next = new DayPilot.Date(startDate).addDays(1);
        datePicker?.select(next);
       a=next;
       console.log(a);
           const columns: ColumnData[] = [
            {name: ''+a.toString().substring(0,10), id: "R1"},
           
        ];
        setColumns(columns);
    };
var a=DayPilot.Date.today();
    useEffect(() => {

        if (!calendar || calendar.disposed()) {
            return;
        }

        const columns: ColumnData[] = [
            {name: ''+a.toString().substring(0,10), id: "R1"},
           
        ];
        setColumns(columns);

        const events: DayPilot.EventData[] = [
      
        ];

        setEvents(events);

        datePicker?.select("2025-11-04");

    }, [calendar, datePicker]);

    const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
console.log("select");
        const column = columns.find(c => c.id === args.resource);
        if (column?.blocked) {
            calendar?.clearSelection();
            return;
        }

        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        calendar?.clearSelection();
        if (modal.canceled) {
            return;
        }
        calendar?.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
            resource: args.resource,
            tags: {}
        });
    };

    const onEventMove = async (args: DayPilot.CalendarEventMoveArgs) => {
        console.log("Move");
        const column = columns.find(c => c.id === args.newResource);
        if (column?.blocked) {
            args.preventDefault();
        }
    };

    return (/**/ 
        <div style={styles.wrap}>
      
            <div id='kalendar' >
                <DayPilotNavigator
                    selectMode={"None"}
                    showMonths={0}
                    skipMonths={0}
                    onTimeRangeSelected={args => setStartDate(args.start)}
                    controlRef={setDatePicker}
                    />
            </div>
            
            <div style={styles.main}>
                <div className={"toolbar"}>
                    <button onClick={onPreviousClick} className={"btn-light"}>Previous</button>
                    <button onClick={onTodayClick}>Today</button>
                    <button onClick={onNextClick} className={"btn-light"}>Next</button>
                </div>
                <DayPilotCalendar
                timeFormat={"Clock24Hours"}
                    viewType={"Resources"}
                    columns={columns}
                    startDate={startDate}
                    events={events}
                    eventBorderRadius={"5px"}
                    headerHeight={50}
                    durationBarVisible={false}
                    onTimeRangeSelected={onTimeRangeSelected}
                    onEventClick={async args => { await editEvent(args.e); }}
                    contextMenu={contextMenu}
                    onBeforeHeaderRender={onBeforeHeaderRender}
                    onBeforeEventRender={onBeforeEventRender}
                    onBeforeCellRender={onBeforeCellRender}
                    onEventMove={onEventMove}
                    controlRef={setCalendar}
                />
            </div>
        </div>
    )
}
