import assert from "assert";

import { extractAttendanceListFromFirestore } from "./attendanceActions";

describe("Attendance Actions", function() {
  it("Should extract list of attendace", async done => {
    const store = {
      schedules: [
        { id: "schedules01", date: "2019-09-22", status: "pending" },
        { id: "schedules02", date: "2019-08-18", status: "pending" },
        { id: "schedules03", date: "2019-08-11", status: "pending" }
      ],
      persons: [
        {
          id: "persons01",
          avatar: "https://image.jpg",
          createAt: { seconds: 1566704387, nanoseconds: 930000000 },
          createBy: "admin",
          firstName: "John",
          fullName: "John Due ",
          lastName: "Due",
          office: "Elder"
        },
        {
          id: "persons02",
          avatar: "https://image.jpg",
          createAt: { seconds: 1566704387, nanoseconds: 930000000 },
          createBy: "admin",
          firstName: "Petter",
          fullName: "Petter Kleiner",
          lastName: "Kleiner",
          office: "Elder"
        }
      ],
      attendances: [
        {
          id: "attendances01",
          personId: "persons01",
          scheduleId: "schedules02",
          quorum: true,
          sacramental: true
        },
        {
          id: "attendances02",
          personId: "persons02",
          scheduleId: "schedules02",
          quorum: true,
          sacramental: false
        }
      ]
    };
    const expected = [
      {
        attendance: {
          id: "attendances01",
          personId: "persons01",
          quorum: true,
          isPend: false,
          sacramental: true,
          scheduleId: "schedules02"
        },
        avatar: "https://image.jpg",
        createAt: { nanoseconds: 930000000, seconds: 1566704387 },
        createBy: "admin",
        firstName: "John",
        fullName: "John Due ",
        id: "persons01",
        lastName: "Due",
        office: "Elder"
      },
      {
        attendance: {
          id: "attendances02",
          personId: "persons02",
          quorum: true,
          isPend: false,
          sacramental: false,
          scheduleId: "schedules02"
        },
        avatar: "https://image.jpg",
        createAt: { nanoseconds: 930000000, seconds: 1566704387 },
        createBy: "admin",
        firstName: "Petter",
        fullName: "Petter Kleiner",
        id: "persons02",
        lastName: "Kleiner",
        office: "Elder"
      }
    ];

    const list = extractAttendanceListFromFirestore(store, "schedules02");

    assert.deepEqual(list, expected);

    done();
  }, 10000);
});
