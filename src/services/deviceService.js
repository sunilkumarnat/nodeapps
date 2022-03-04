import conection from "../configs/connectDB"


const insertData = (deviceData) => {
    return new Promise(async(resolve, reject) => {
        try {

            // live device & recharge data 
            const liveRechargeData = await deviceLiveRechargeData(deviceData.ID)

            if (liveRechargeData.rechargeBit == 2 && deviceData.RB == 2) {
                const deviceUpdatedata = {
                    days: (parseInt(deviceData.DY) + parseInt(liveRechargeData.days)), // Days
                    hours: (parseInt(deviceData.HR) + parseInt(liveRechargeData.hours)), // Hours
                    minutes: (parseInt(deviceData.MN) + parseInt(liveRechargeData.minutes)), // Minutes
                    rechargeBit: 3, // Recharge Bit
                    addressData: deviceData.AD, // Address Data
                    voltage: deviceData.VL, // Voltage
                    frequency: deviceData.FR, // Frquency
                    rpm: deviceData.RPM, // Rpm
                    current: deviceData.CR // Current
                }

                //update data
                updateDeviceDataByID(deviceData.ID, deviceUpdatedata);
                // get update data
                const liveDeviceData = await getLiveDeviceDataByID(deviceData.ID);

                // string 
                const string = String(liveDeviceData.days).padStart(3, '0') + ',' + String(liveDeviceData.hours).padStart(3, '0') + ',' + String(liveDeviceData.minutes).padStart(3, '0') + ',2,' + String(liveDeviceData.address).padStart(4, '0') + ',' + liveDeviceData.lockBit

                resolve(string)

            } else if (deviceData.RB == 2 && liveRechargeData.dy == deviceData.DY && liveRechargeData.hr == deviceData.HR && liveRechargeData.mn == deviceData.MN) {

                // update device data
                const deviceUpdatedata = {
                    rechargeBit: 3
                }

                updateDeviceDataByID(deviceData.ID, deviceUpdatedata);


                // string 
                const string = String('0').padStart(3, '0') + ',' + String('0').padStart(3, '0') + ',' + String('0').padStart(3, '0') + ',' + liveRechargeData.rechargeBit + ',' + String(liveRechargeData.address).padStart(4, '0') + ',' + liveRechargeData.lockBit

                resolve(string)

            } else if (deviceData.DY == 255 && deviceData.HR == 255 && deviceData.MN == 255) {
                // update device data
                const deviceUpdatedata = {
                    rechargeBit: 3
                }

                updateDeviceDataByID(deviceData.ID, deviceUpdatedata);

                // get update data
                const liveDeviceData = await getLiveDeviceDataByID(deviceData.ID);

                // string 
                const string = String(liveDeviceData.days).padStart(3, '0') + ',' + String(liveDeviceData.hours).padStart(3, '0') + ',' + String(liveDeviceData.minutes).padStart(3, '0') + ',2,' + String(liveDeviceData.address).padStart(4, '0') + ',' + liveDeviceData.lockBit

                resolve(string)

            } else {
                const historyData = {
                    device_id: deviceData.ID, // Device ID
                    days: deviceData.DY, // Days
                    hours: deviceData.HR, // Hours
                    minutes: deviceData.MN, // Minutes
                    rechargeBit: deviceData.RB, // Recharge Bit
                    addressData: deviceData.AD, // Address Data
                    voltage: deviceData.VL, // Voltage
                    frequency: deviceData.FR, // Frquency
                    rpm: deviceData.RPM, // Rpm
                    current: deviceData.CR, // Current 
                    lockBit: deviceData.LB, // Lock Bit
                    updateBit: deviceData.UB
                }

                conection.query("INSERT INTO deviceshistory SET ? ", historyData, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(liveRechargeData)
                    }
                })

                // string 
                const string = String('0').padStart(3, '0') + ',' + String('0').padStart(3, '0') + ',' + String('0').padStart(3, '0') + ',' + liveRechargeData.rechargeBit + ',' + String(liveRechargeData.address).padStart(4, '0') + ',' + liveRechargeData.lockBit

                resolve(string)

            }


        } catch (e) {
            reject(e);
        }
    })
}

const deviceLiveRechargeData = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT d.rechargeBit, d.lockBit, d.address, d.days as dy, d.hours as hr, d.minutes as mn, rh.* FROM liveDevices d LEFT JOIN rechargeHistory rh ON rh.device_id = d.id AND rh.id = d.recharge_id WHERE d.id = ?", id, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results[0])
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getLiveDeviceDataByID = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM liveDevices WHERE id = ?", id, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results[0])
            })
        } catch (e) {
            reject(e);
        }
    })
}

const updateDeviceDataByID = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("UPDATE  liveDevices set ? WHERE id = " + id, data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })
        } catch (e) {
            reject(e);
        }
    })
}

const register = (data) => {
    return new Promise((resolve, reject) => {
        try {

            conection.query("INSERT INTO devices SET ? ", data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getAllDevices = () => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM devices ORDER BY serial_no ASC", (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getDeviceById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("SELECT * FROM devices where id = ?", id, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results[0])
            })
        } catch (e) {
            reject(e);
        }
    })
}

const updateDevice = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("UPDATE devices SET ? WHERE id = " + id, data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })
        } catch (e) {
            reject(e);
        }
    })
}

const deleteDevice = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("DELETE FROM devices where id = ?", id, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })
        } catch (e) {
            reject(e);
        }
    })
}

const registerNewLiveDevice = (data) => {
    return new Promise((resolve, reject) => {
        try {
            conection.query("INSERT INTO liveDevices SET ?", data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(true)
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    insertData: insertData,
    register: register,
    getAllDevices: getAllDevices,
    getDeviceById: getDeviceById,
    updateDevice: updateDevice,
    deleteDevice: deleteDevice,
    registerNewLiveDevice: registerNewLiveDevice
}