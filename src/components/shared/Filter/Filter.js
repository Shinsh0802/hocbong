import React from 'react'
import { Button } from 'react-bootstrap'
import { RiFilterLine } from 'react-icons/ri'
import style from './style.module.css'
const Filter = ({ setG, setCongDong, handleFilter }) => {
    const changstateG = event => {
        setG(event.target.value);
    };
    const changstateCongDong = event => {
        setCongDong(event.target.value);
    };

    return (
        <div>
            <div className={style.searchBar}>
                <div className={style.G} style={{ display: "flex", alignItems: "center" }}>
                    {/* Input lọc theo G */}
                    <input
                        className={style.inputG}
                        style={{ height: "30px", marginRight: "10px", width: "80px" }}
                        type="number"
                        min="1"
                        max="15"
                        placeholder="Tất cả G"
                        // name={stateG}
                        onChange={changstateG}
                    />
                </div>
                <div className={style.congDong} style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                    {/* Select cộng đồng */}
                    <select className={style.inputCongDong} onChange={changstateCongDong} style={{ height: "30px" }}>
                        <option value="Tất cả">Tất cả cộng đồng</option>
                        <option value="Huế">Huế</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Hà Nội">Hà Nội</option>
                    </select>
                </div>
                <Button className={style.buttonFilter} variant="secondary" onClick={handleFilter}><RiFilterLine style={{ fontSize: "120%" }} /> Lọc</Button>
            </div>

        </div>
    )
}

export default Filter
