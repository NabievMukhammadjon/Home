<?php
    use PHPMailler\PHPMailler\PHPMailler;
    use PHPMailler\PHPMailler\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailler.php';

    $mail = new PHPMailler(true);
    $mail -> CharSet = 'UTF-8';
    $mail -> setLanguage('ru', 'phpmailer/language/');
    $mail -> IsHTML(true);

    // от кого письмо
    $mail -> setFrom('info@fls.guru', 'Фрилансер по жизни');
    // кому отправить
    $mail -> addAddress('nnabiev1812@gmail.com');
    // Тема письма
    $mail -> Subject = 'Привет! Это Мухаммаджон Набиев';

    // Рука
    $hand = 'Правая';
    if($_POST['hand'] == 'left'){
        $hand = 'Левая';
    }

    // Тело письма
    $body = '<h1>Встречайте супер письмо!</h1>';
    
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
    }
    
    if(trim(!empty($_POST['hand']))){
        $body.='<p><strong>Рука:</strong> '.$hand.'</p>';
    }
    
    if(trim(!empty($_POST['age']))){
        $body = '<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body = '<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }
    
    // Прикрепить файл
    if (!empty($_FILES['image']['tmp_name'])) {
        // путь загрузки файла
        $filePath = __DIR__ . '/files/' . $_FILES['image']['name'];
        // грузим файл
        if (copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.= '<p><strong>Фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    // Отправляем
    if(!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>