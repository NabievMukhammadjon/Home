<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $hiddenValue = $_POST['hiddenValue'];

    $data = [
        'stream_code' => 'iu244',
        'client' => [
            'name' => $name,
            'phone' => $phone,
        ],
        'sub1' => $hiddenValue,
    ];

    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer NWJLZGEWOWETNTGZMS00MZK4LWFIZJUTNJVMOTG0NJQXOTI3',
    ];

    $options = [
        'http' => [
            'header' => implode("\r\n", $headers),
            'method' => 'POST',
            'content' => json_encode($data),
        ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents('https://order.drcash.sh/v1/order', false, $context);

    if ($result !== false) {
        // Обработка успешного ответа
        header('Location: thank_you.php');
        exit;
    } else {
        // Обработка ошибки
        header('Location: error.php');
        exit;
    }
}
?>
