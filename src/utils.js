export default function formatDate(inputDate) {
    let components = inputDate.split("-");
    let formattedDate = components[2] + "." + components[1] + "." + components[0];
    return formattedDate;
}

