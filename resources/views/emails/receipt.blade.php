<!DOCTYPE html>
<html>
<head>
    <title>Receipt</title>
</head>
<body>
    <h2>Receipt Details</h2>
    <p><strong>Customer ID:</strong> {{ $receiptData['C_Id'] }}</p>
    <p><strong>Total Amount:</strong> {{ $receiptData['Grand_Total'] }}</p>
    <p><strong>Receipt Date:</strong> {{ $receiptData['Rec_Date'] }}</p>
    
    <h3>Products</h3>
    <ul>
        @foreach($receiptData['invoiceProducts'] as $product)
            <li>{{ $product['Name'] }} - ₹{{ $product['Total'] }}</li>
        @endforeach
    </ul>

    <h3>Payment Details</h3>
    <p><strong>Payment Mode:</strong> {{ $receiptData['paymentData'][0]['paymentMode'] }}</p>
    <p><strong>Reference No:</strong> {{ $receiptData['paymentData'][0]['refNo'] }}</p>

    <p>Thank you for your purchase!</p>
</body>
</html>
