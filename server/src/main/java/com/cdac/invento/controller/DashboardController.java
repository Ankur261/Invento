package com.cdac.invento.controller;

import com.cdac.invento.model.DashboardDto;
import com.cdac.invento.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardDto getStats() {
        return dashboardService.getDashboardStats();
    }
}
