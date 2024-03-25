<?php
// Перевірка наявності POST-даних
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримання даних форми
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Визначення отримувача
    $to = '6weeks.12h@gmail.com'; // Екранування адреси електронної пошти
    $message = '';
    // Підготовка електронного листа
    $subject = "6weeks - Форма заповнена";
    if (!empty($data['name'])) {
        $message .= 'Ім\'я: ' . htmlspecialchars($data['name']) . "\r\n"; // Екранування тексту листа
    }
    
    // Додавання інших даних
    $message .= 'Gmail: ' . htmlspecialchars($data['email']) . "\r\n";
    if (!empty($data['text'])) {
        $message .= 'Text: ' . htmlspecialchars($data['text']) . "\r\n";
    }


    $headers = 'From: tech-task@example.com' . "\r\n" .
        'Reply-To: '. htmlspecialchars($data['Gmail']) . "\r\n" . // Екранування адреси відповіді
        'X-Mailer: PHP/' . phpversion();
    
    $mailSent = mail($to, $subject, $message, $headers);
    
    // Відповідь JSON щодо успішності відправки
    if ($mailSent) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
}
?>
