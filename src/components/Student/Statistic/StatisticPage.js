import Statistic from "./Statistic/Statistic";
import {Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Service from "../../../api/service";
import "./stat.css"
import { testdata } from "./Statistic/testdata";
//import ProfilePage from "../profile/ProfilePage";

const StatPage = () => {
    var service = new Service();
    const [studentsAll, setStudentsAll] = useState([]);
    const [studentFilter, setStudentFilter] = useState("new");
    const [studentFilter1, setStudentFilter1] = useState("new");
    const [studentFilter2, setStudentFilter2] = useState([]);
    const [studentFilter3, setStudentFilter3] = useState([]);
    const [studentFilter4, setStudentFilter4] = useState([]);
    const [studentFilter5, setStudentFilter5] = useState([]);
    const [studentFilter6, setStudentFilter6] = useState([]);
    const [studentFilter7, setStudentFilter7] = useState([]);


    const [numRows, setnumRows] = useState(studentsAll.length);
    
    const [state, setState] = useState({
        ready1: false,
        pvCD: false,
        pvBDH: false,
        ready2:false,
        done: false,
        yield: false,
        stop: false
    });

    const [state1, setState1] = useState(studentsAll.length);
    const [state2, setState2] = useState(studentsAll.length);
    const [state3, setState3] = useState(studentsAll.length);
    const [state4, setState4] = useState(studentsAll.length);
    const [state5, setState5] = useState(studentsAll.length);

    const [state6, setState6] = useState(studentsAll.length);
    const [state7, setState7] = useState(studentsAll.length);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const url = "/filter-students"
                const res = await service.get(url);
                if (!res.data.students.data) {
                    setStudentsAll([]);
                } else {
                    // setStudentsAll(res.data.students.data);
                    //sort
                    let sortdata = testdata.sort((ff, ss) => {
                        if (ff.group === ss.group) {
                            // bo chu G o dau
                            let fteam = ff.teams.substring(1);
                            let steam = ss.teams.substring(1);
                            return parseInt(fteam) - parseInt(steam);
                        } else {
                            if (ff.group < ss.group) {
                                return -1;
                            } else {
                                return 1;
                            }
                        }
                    })
                    setStudentsAll(sortdata);
                }
            } catch (error) {
                setStudentsAll([]);
            }
        };
        getStudents();
    }, []);
    // handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData.get("group"), formData.get("teams"));
        let result = studentsAll.filter((data) => {
            return data.teams.search(formData.get("teams")) !== -1 && data.group.search(formData.get("group")) !== -1;
        });
        setStudentFilter(result)

        let result1 = studentsAll.filter((data) => {
            return data.teams.search(formData.get("teams")) !== -1 && data.group.search(formData.get("group")) !== -1;
        });
        setStudentFilter1(result1)

        setnumRows(studentFilter.length)
        setState1(studentFilter1.length)
        setState2(studentFilter2.length)
        setState3(studentFilter3.length)
        setState4(studentFilter4.length)
        setState5(studentFilter5.length)
        setState6(studentFilter6.length)
        setState7(studentFilter7.length)
    }
    
    return (
        <div >
            <Switch>

                    <div style={{padding: "0 20%"}}>
                        <Statistic  num = {numRows} num1 = {state1} num2 = {state2} num3 = {state3} num4 = {state4} num5 ={state5} num6 ={state6} num7 = {state7} handleSubmit={handleSubmit}/>
                        
                    </div>
            </Switch>
        </div>
    );
}

export default StatPage;