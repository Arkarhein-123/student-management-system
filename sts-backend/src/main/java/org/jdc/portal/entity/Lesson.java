package org.jdc.portal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title",length = 100, nullable = false)
    private String title;

    @Column(name = "module_name",length = 100, nullable = false)
    private String moduleName;

    @Column(name = "recording_url",length = 150)
    private String recordingUrl;

    @Column(name = "material_url",length = 150)
    private String materialUrl;

    @Column(name = "publish_date", nullable = false)
    private LocalDate publishDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", nullable = false)
    private Batch batch;

}
