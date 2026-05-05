package com.shelkeorganic.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @GetMapping("/products")
    public List<Map<String, Object>> getProducts() {

        List<Map<String, Object>> products = new ArrayList<>();

        products.add(Map.of(
                "id", 1,
                "name", "A2 Gir Cow Ghee",
                "category", "Ghee",
                "price", 899,
                "mrp", 999,
                "image", "https://via.placeholder.com/150",
                "stock", 20,
                "featured", true
        ));

        products.add(Map.of(
                "id", 2,
                "name", "Khapli Wheat Atta",
                "category", "Atta",
                "price", 249,
                "mrp", 299,
                "image", "https://via.placeholder.com/150",
                "stock", 30,
                "featured", true
        ));

        return products;
    }
}
