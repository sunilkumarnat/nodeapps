import deviceService from "../services/deviceService"
import companyService from "../services/companyService"
import moterService from "../services/moterService"

const insert = async(req, res) => {
    const deviceData = {
        ID: req.query.ID, // Device ID
        DY: req.query.DY, // Days
        HR: req.query.HR, // Hours
        MN: req.query.MN, // Minutes
        RB: req.query.RB, // Recharge Bit
        AD: req.query.AD, // Address Data
        VL: req.query.VL, // Voltage
        FR: req.query.FR, // Frquency
        RPM: req.query.RPM, // Rpm
        CR: req.query.CR, // Current 
        LB: req.query.LB, // Lock Bit
        UB: req.query.UB // UPdate Bit
    }
    const outputString = await deviceService.insertData(deviceData)
    return res.render("insert", { title: "Admin | Insert Data", output: outputString })
}

const registerDevice = (req, res) => {
    return res.render("register-device", { title: "Admin | Register Device", user: req.user, errors: '', success: '' })
}

const getDevices = async(req, res) => {
    const allDevices = await deviceService.getAllDevices()
    return res.render("all-devices", { title: "Admin | All Devices", user: req.user, devices: allDevices })
}

const registerNewDevice = async(req, res) => {
    try {

        const device = {
            company: req.body.company,
            serial_no: req.body.serial_no,
            manufacturing_date: req.body.manufacturing_date,
            frequency: req.body.frequency,
            voltage: req.body.voltage,
            power: req.body.power,
            rpm: req.body.rpm,
            current: req.body.current,
            specification: req.body.specification,
            device_mobile_imei_no: req.body.device_mobile_imei_no

        }

        await deviceService.register(device);

        req.flash("success", "New Device Registered Successfully !")
        return res.render("register-device", { title: "Admin | Register Device", user: req.user, errors: '', success: req.flash('success') })


    } catch (e) {
        req.flash("errors", e.message)
        return res.render("register-device", { title: "Admin | Register Device", user: req.user, errors: req.flash('errors'), success: '' })
    }
}

const editDevices = async(req, res) => {
    const deviceData = await deviceService.getDeviceById(req.params.id)
    return res.render("edit-device", { title: "Admin | Edit Device", user: req.user, device: deviceData, errors: req.flash("errors") })
}

const updateDevices = async(req, res) => {
    const id = req.body.id
    try {

        const device = {
            company: req.body.company,
            serial_no: req.body.serial_no,
            manufacturing_date: req.body.manufacturing_date,
            frequency: req.body.frequency,
            voltage: req.body.voltage,
            power: req.body.power,
            rpm: req.body.rpm,
            current: req.body.current,
            specification: req.body.specification,
            device_mobile_imei_no: req.body.device_mobile_imei_no
        }

        await deviceService.updateDevice(id, device);

        req.flash("success", "Device Updated Successfully !")
        return res.redirect("/all-devices")


    } catch (e) {
        req.flash("errors", e.message)
        return res.redirect("/edit-device/" + id)
    }
}


const deleteDevices = async(req, res) => {
    await deviceService.deleteDevice(req.params.id);
    return res.redirect("/all-devices")
}

const registerDeviceToCompany = async(req, res) => {
    const allCompanies = await companyService.getAllCompanies()
    const allMoters = await moterService.getAllMoters()
    const allDevices = await deviceService.getAllDevices()

    return res.render("register-device-to-company", { title: "Admin | Register Device To Company", user: req.user, errors: '', success: '', companies: allCompanies, moters: allMoters, devices: allDevices })
}

const registerNewDeviceToCompany = async(req, res) => {

    const allCompanies = await companyService.getAllCompanies()
    const allMoters = await moterService.getAllMoters()
    const allDevices = await deviceService.getAllDevices()

    try {

        const device = {
            company_id: req.body.company_id,
            moter_serial_no: req.body.moter_serial_no,
            device_id: req.body.device_id

        }

        await deviceService.register(device);

        req.flash("success", "Device Registered Successfully !")
        return res.render("register-device", { title: "Admin | Register Device", user: req.user, errors: '', success: req.flash('success'), companies: allCompanies, moters: allMoters, devices: allDevices })


    } catch (e) {
        req.flash("errors", e.message)
        return res.render("register-device", { title: "Admin | Register Device", user: req.user, errors: req.flash('errors'), success: '', companies: allCompanies, moters: allMoters, devices: allDevices })
    }
}



module.exports = {
    insert: insert,
    registerDevice: registerDevice,
    registerNewDevice: registerNewDevice,
    getDevices: getDevices,
    editDevices: editDevices,
    updateDevices: updateDevices,
    deleteDevices: deleteDevices,
    registerDeviceToCompany: registerDeviceToCompany,
    registerNewDeviceToCompany: registerNewDeviceToCompany
}