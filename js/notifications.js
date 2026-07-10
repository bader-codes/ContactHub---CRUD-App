export function showSuccess(message) {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function warningMsg(message) {
  return Swal.fire({
    title: message,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
    icon: "warning",
  });
}
