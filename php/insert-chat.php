<?php

    session_start();
    include_once "config.php";

    if (isset($_SESSION['unique_id'])) {
        $outgoing = mysqli_real_escape_string($conn, $_POST['outgoing_id']);
        $incoming = mysqli_real_escape_string($conn, $_POST['incoming_id']);
        $message = mysqli_real_escape_string($conn, $_POST['message']);

        if (!empty($message)) {
            $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg)
                                        VALUES ({$incoming}, {$outgoing}, '{$message}')") or die();
        }

    } else {
        header("../login.php");
    }


?>