<?php

    session_start();
    include_once "config.php";

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if (!empty($fname) && !empty($lname) && !empty($email) && !empty($password)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // checking if user already exists
            $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
            if (mysqli_num_rows($sql) > 0) {
                // user already exists
                echo "$email - This email already exist!";
            } else {
                // checking the user uploaded image
                if (isset($_FILES['image'])) { 

                    $img_name = $_FILES['image']['name'];   // getting image name
                    $tmp_name = $_FILES['image']['tmp_name'];   // getting image temporary name

                    $img_explode = explode('.', $img_name);
                    $img_ext = end($img_explode);   // getting image extension
                    
                    $extensions = ['png', 'jpeg', 'jpg', 'webp'];   // array of valid extensions

                    if (in_array($img_ext, $extensions) === true) {
                        $time = time();
                        $new_img_name = $time.$img_name;

                        if (move_uploaded_file($tmp_name, "user-images/".$new_img_name)) {
                            $status = "Active now";
                            $random_id = rand(time(), 10000000);

                            // inserting user details to data base
                            $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status)
                                                 VALUES ('{$random_id}', '{$fname}', '{$lname}', '{$email}', '{$password}', '{$new_img_name}', '{$status}')");

                            if ($sql2) {
                                // user inserted successfully
                                $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                                
                                if (mysqli_num_rows($sql3) > 0) {
                                    $row = mysqli_fetch_assoc($sql3);
                                    $_SESSION['unique_id'] = $row['unique_id'];
                                    echo "success";
                                } else {
                                    echo "Failed to retrieve user details from the database!";
                                }
                            } else {
                                echo "Database insertion failed!" . mysqli_error($conn);
                            }
                        } else {
                            echo "Failed to upload image! Error code : " . $_FILES['image']['error'];
                        }
                    } else {
                        echo "Invalid image file type!";
                    }

                } else {
                    echo "Please select an image file to upload!";
                }
            }
        } else {
            echo "Please enter a valid email address!";
        }
    } else {
        echo "All input fields are required!";
    }
?>